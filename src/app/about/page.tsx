import React from 'react';

export const metadata = {
    title: '소개 - MoneyLife',
    description: 'MoneyLife 서비스 소개입니다.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">MoneyLife 소개</h1>

            <div className="prose prose-slate max-w-none">
                <p className="text-lg mb-6">
                    MoneyLife는 복잡한 금융 계산을 쉽고 정확하게 도와드리는 금융 유틸리티 서비스입니다.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-12">
                    <div className="p-6 bg-white border rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">🎯 정확한 계산</h3>
                        <p className="text-gray-600">
                            최신 세법과 규정을 반영하여 연봉 실수령액, 대출 이자, 적금 만기액 등을 정확하게 계산해드립니다.
                        </p>
                    </div>
                    <div className="p-6 bg-white border rounded-xl shadow-sm">
                        <h3 className="text-xl font-bold mb-3">📚 유용한 정보</h3>
                        <p className="text-gray-600">
                            어려운 금융 용어와 제도를 알기 쉽게 풀어서 설명해드리는 가이드 콘텐츠를 제공합니다.
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">제공 서비스</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>연봉 실수령액 계산기 (2025년 최신 세율 적용)</li>
                    <li>대출 이자 계산기 (원리금균등, 원금균등, 체증식)</li>
                    <li>예적금 복리 계산기</li>
                    <li>퇴직금 및 실업급여 계산기</li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">문의하기</h2>
                <p className="mb-4">
                    서비스 이용 중 불편한 점이나 제안사항이 있으시면 아래 이메일로 연락주세요.
                    <br />
                    <a href="mailto:contact@moneylife.kr" className="text-blue-600 hover:underline">contact@moneylife.kr</a>
                </p>
            </div>
        </div>
    );
}
