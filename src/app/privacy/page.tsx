import React from 'react';

export const metadata = {
    title: '개인정보처리방침 - MoneyLife',
    description: 'MoneyLife의 개인정보처리방침입니다.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

            <div className="prose prose-slate max-w-none">
                <p className="mb-4">
                    MoneyLife(이하 '회사')는 이용자의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">1. 수집하는 개인정보 항목</h2>
                <p className="mb-4">
                    회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>수집항목: 쿠키, 접속 로그, 접속 IP 정보</li>
                    <li>개인정보 수집방법: 홈페이지</li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">2. 개인정보의 수집 및 이용목적</h2>
                <p className="mb-4">
                    회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                    <li>회원 관리</li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">3. 개인정보의 보유 및 이용기간</h2>
                <p className="mb-4">
                    원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">4. 쿠키(Cookie)의 운용 및 거부</h2>
                <p className="mb-4">
                    회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
                    이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나,
                    쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">5. Google AdSense</h2>
                <p className="mb-4">
                    본 사이트는 Google AdSense 광고를 포함하고 있습니다. Google을 포함한 제3자 공급업체는 쿠키를 사용하여
                    사용자의 이전 웹사이트 방문 기록을 기반으로 광고를 게재합니다.
                    사용자는 광고 설정에서 맞춤형 광고를 선택 해제할 수 있습니다.
                </p>

                <div className="mt-12 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                        본 방침은 2026년 1월 1일부터 시행됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
