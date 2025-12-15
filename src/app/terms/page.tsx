import React from 'react';

export const metadata = {
    title: '이용약관 - MoneyLife',
    description: 'MoneyLife의 이용약관입니다.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">이용약관</h1>

            <div className="prose prose-slate max-w-none">
                <h2 className="text-xl font-bold mt-8 mb-4">제1조 (목적)</h2>
                <p className="mb-4">
                    본 약관은 MoneyLife(이하 '회사')가 제공하는 서비스의 이용조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">제2조 (약관의 효력 및 변경)</h2>
                <p className="mb-4">
                    회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
                    회사는 "약관의 규제에 관한 법률", "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">제3조 (서비스의 제공)</h2>
                <p className="mb-4">
                    회사는 다음과 같은 서비스를 제공합니다.
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>금융 계산기 서비스 (연봉, 대출, 적금 등)</li>
                    <li>금융 정보 및 가이드 제공</li>
                    <li>기타 회사가 정하는 서비스</li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">제4조 (면책조항)</h2>
                <p className="mb-4">
                    회사가 제공하는 계산기 결과와 금융 정보는 참고용이며, 실제 금융기관의 결과와 다를 수 있습니다.
                    회사는 서비스 이용으로 인해 발생한 손해에 대해 책임을 지지 않습니다.
                    정확한 정보는 해당 금융기관에 반드시 확인하시기 바랍니다.
                </p>

                <div className="mt-12 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                        본 약관은 2025년 1월 1일부터 시행됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
