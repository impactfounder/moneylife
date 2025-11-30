# GitHub 연결 가이드

## 1단계: Git 저장소 초기화

```bash
git init
```

## 2단계: 파일 추가 및 첫 커밋

```bash
git add .
git commit -m "Initial commit: MoneyLife 금융계산기 프로젝트"
```

## 3단계: GitHub에서 새 저장소 생성

1. GitHub.com에 로그인
2. 우측 상단의 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 이름 입력 (예: `moneylife` 또는 `moneylife-kr`)
4. Public 또는 Private 선택
5. **"Initialize this repository with a README" 체크하지 않기** (이미 로컬에 파일이 있으므로)
6. "Create repository" 클릭

## 4단계: 원격 저장소 연결

GitHub에서 생성한 저장소의 URL을 복사한 후:

```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

예시:
```bash
git remote add origin https://github.com/yourusername/moneylife-kr.git
```

## 5단계: 브랜치 이름 설정 (선택사항)

```bash
git branch -M main
```

## 6단계: GitHub에 푸시

```bash
git push -u origin main
```

## 추가 명령어

### 원격 저장소 확인
```bash
git remote -v
```

### 원격 저장소 변경
```bash
git remote set-url origin https://github.com/새사용자명/새저장소명.git
```

### 이후 변경사항 푸시
```bash
git add .
git commit -m "변경사항 설명"
git push
```

## SSH 키 사용하기 (선택사항)

SSH 키를 사용하면 매번 비밀번호를 입력할 필요가 없습니다.

### SSH 키 생성
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### SSH 키 복사
```bash
cat ~/.ssh/id_ed25519.pub
```

### GitHub에 SSH 키 추가
1. GitHub → Settings → SSH and GPG keys
2. "New SSH key" 클릭
3. 복사한 키 붙여넣기
4. "Add SSH key" 클릭

### SSH URL로 원격 저장소 설정
```bash
git remote set-url origin git@github.com:사용자명/저장소명.git
```


