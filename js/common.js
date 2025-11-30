// ========================================
// 금융 계산기 - 공통 함수
// ========================================

// 숫자 포맷팅 (천단위 콤마)
function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return Math.round(num).toLocaleString('ko-KR');
}

// 통화 포맷팅
function formatCurrency(num) {
    return formatNumber(num) + '원';
}

// 백분율 포맷팅
function formatPercent(num, decimals = 2) {
    if (typeof num !== 'number' || isNaN(num)) return '0%';
    return num.toFixed(decimals) + '%';
}

// 문자열을 숫자로 변환 (콤마 제거)
function parseNumber(str) {
    if (typeof str === 'number') return str;
    const cleaned = String(str).replace(/[^0-9.-]/g, '');
    return parseFloat(cleaned) || 0;
}

// 입력 필드에 천단위 콤마 자동 추가
function setupNumberInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            e.target.value = parseInt(value).toLocaleString('ko-KR');
        }
    });
}

// 여러 입력 필드에 천단위 콤마 적용
function setupNumberInputs(inputIds) {
    inputIds.forEach(id => setupNumberInput(id));
}

// 결과 표시 애니메이션
function animateValue(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    const startNum = parseNumber(start);
    const endNum = parseNumber(end);
    const diff = endNum - startNum;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart 이징 함수
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = startNum + (diff * eased);
        
        element.textContent = formatCurrency(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 로딩 표시
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: var(--text-secondary);">계산 중...</p>
        </div>
    `;
}

// 차트 생성 헬퍼 함수 (Chart.js 사용)
function createLineChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

// 파이 차트 생성 헬퍼 함수
function createPieChart(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors || [
                    '#2563eb',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 바 차트 생성 헬퍼 함수
function createBarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                x: {
                    stacked: true
                }
            }
        }
    });
}

// 폼 유효성 검사
function validatePositiveNumber(value, fieldName) {
    const num = parseNumber(value);
    if (isNaN(num) || num <= 0) {
        alert(`${fieldName}을(를) 올바르게 입력해주세요.`);
        return false;
    }
    return true;
}

// 날짜 포맷팅
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 모바일 메뉴 토글
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const dropdown = document.querySelector('.mobile-dropdown');
    
    if (menuBtn && dropdown) {
        // 메뉴 열기
        menuBtn.addEventListener('click', () => {
            dropdown.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        });
        
        // 메뉴 닫기
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                dropdown.classList.remove('active');
                document.body.style.overflow = ''; // 스크롤 복원
            });
        }
        
        // 배경 클릭 시 닫기
        dropdown.addEventListener('click', (e) => {
            if (e.target === dropdown) {
                dropdown.classList.remove('active');
                document.body.style.overflow = ''; // 스크롤 복원
            }
        });
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
});

// 스크롤 시 헤더 그림자 추가
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    }
});

// ========================================
// 통계 수집 시스템 (비활성화)
// ========================================

// 페이지 방문 기록 (더미 함수)
function trackCalculatorUsage(calculatorType) {
    // 통계 수집 비활성화됨
    return;
}

// 계산 완료 기록 (더미 함수)
function trackCalculation(calculatorType) {
    // 통계 수집 비활성화됨
    return;
}
