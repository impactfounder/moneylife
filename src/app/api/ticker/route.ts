import { NextResponse } from 'next/server';

// 캐시 시간 (초) - 5분
const CACHE_DURATION = 300;

interface TickerItem {
  price: number;
  change: number;
}

interface TickerResponse {
  bitcoin: TickerItem;
  ethereum: TickerItem;
  gold: TickerItem;
  usdkrw: TickerItem;
  kospi: TickerItem;
  nasdaq: TickerItem;
  sp500: TickerItem;
  dow: TickerItem;
  updatedAt: string;
}

interface CacheData {
  data: TickerResponse;
  timestamp: number;
}

let cache: CacheData | null = null;

// Yahoo Finance 비공식 API로 주가지수 가져오기
async function fetchYahooQuote(symbol: string): Promise<TickerItem> {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        next: { revalidate: CACHE_DURATION }
      }
    );

    if (!res.ok) throw new Error(`Yahoo API failed for ${symbol}`);

    const data = await res.json();
    const meta = data.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice || 0;
    const previousClose = meta?.chartPreviousClose || meta?.previousClose || price;
    const change = previousClose ? ((price - previousClose) / previousClose) * 100 : 0;

    return { price, change };
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);
    return { price: 0, change: 0 };
  }
}

export async function GET() {
  // 캐시가 유효하면 캐시된 데이터 반환
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION * 1000) {
    return NextResponse.json(cache.data);
  }

  try {
    // 병렬로 모든 데이터 가져오기
    const [
      cryptoRes,
      usdkrwRes,
      goldRes,
      kospiRes,
      nasdaqRes,
      sp500Res,
      dowRes
    ] = await Promise.all([
      // 1. CoinGecko - 비트코인, 이더리움 (KRW)
      fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=krw&include_24hr_change=true',
        {
          next: { revalidate: CACHE_DURATION },
          headers: { 'Accept': 'application/json' }
        }
      ),
      // 2. 환율 USD/KRW (Yahoo Finance - KRW=X)
      fetchYahooQuote('KRW=X'),
      // 3. 금 시세 (GC=F: Gold Futures)
      fetchYahooQuote('GC=F'),
      // 4. 코스피 (^KS11)
      fetchYahooQuote('^KS11'),
      // 5. 나스닥 (^IXIC)
      fetchYahooQuote('^IXIC'),
      // 6. S&P 500 (^GSPC)
      fetchYahooQuote('^GSPC'),
      // 7. 다우존스 (^DJI)
      fetchYahooQuote('^DJI')
    ]);

    // 암호화폐 데이터 파싱
    let bitcoin: TickerItem = { price: 0, change: 0 };
    let ethereum: TickerItem = { price: 0, change: 0 };

    if (cryptoRes.ok) {
      const cryptoData = await cryptoRes.json();
      bitcoin = {
        price: cryptoData.bitcoin?.krw || 0,
        change: cryptoData.bitcoin?.krw_24h_change || 0,
      };
      ethereum = {
        price: cryptoData.ethereum?.krw || 0,
        change: cryptoData.ethereum?.krw_24h_change || 0,
      };
    }

    // 환율 데이터 (Yahoo Finance에서 변동률 포함)
    const usdkrw: TickerItem = usdkrwRes.price > 0
      ? usdkrwRes
      : { price: 1380, change: 0 };

    // 금 시세를 KRW로 변환 (온스 -> 돈(3.75g), USD -> KRW)
    // 1 troy oz = 31.1035g, 1돈 = 3.75g
    const goldPricePerDon = goldRes.price > 0
      ? (goldRes.price / 31.1035) * 3.75 * usdkrw.price
      : 0;

    const result: TickerResponse = {
      bitcoin,
      ethereum,
      gold: { price: Math.round(goldPricePerDon), change: goldRes.change },
      usdkrw,
      kospi: kospiRes,
      nasdaq: nasdaqRes,
      sp500: sp500Res,
      dow: dowRes,
      updatedAt: new Date().toISOString(),
    };

    // 캐시 업데이트
    cache = { data: result, timestamp: Date.now() };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Ticker API Error:', error);

    // 에러 시 캐시된 데이터라도 반환
    if (cache) {
      return NextResponse.json(cache.data);
    }

    // 최후의 폴백 데이터
    return NextResponse.json({
      bitcoin: { price: 0, change: 0 },
      ethereum: { price: 0, change: 0 },
      gold: { price: 0, change: 0 },
      usdkrw: { price: 1380, change: 0 },
      kospi: { price: 0, change: 0 },
      nasdaq: { price: 0, change: 0 },
      sp500: { price: 0, change: 0 },
      dow: { price: 0, change: 0 },
      updatedAt: new Date().toISOString(),
      error: 'Failed to fetch market data'
    });
  }
}
