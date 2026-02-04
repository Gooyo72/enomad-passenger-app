# Passenger App (Хэрэглэгчийн Апп)

Энэхүү төсөл нь ENomad системийн зорчигчдод зориулсан React Native апп юм.

## Технологийн стек
- **React Native 0.83.1**
- **TypeScript**
- **React Navigation** (Navigation)
- **Zustand** (State management)
- **TanStack React Query** (API Caching)
- **Axios** (HTTP Client)
- **React Hook Form** (Forms)

## Суулгах заавар

1. Фолдер руу орох:
   ```bash
   cd passenger
   ```

2. Хамааралтай сангуудыг суулгах:
   ```bash
   npm install
   ```

3. iOS (зөвхөн macOS дээр):
   ```bash
   cd ios && pod install && cd ..
   ```

## Ажиллуулах

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Төслийн бүтэц
- `src/api`: API хүсэлтүүд болон төрлүүд
- `src/components`: Дахин ашиглагдах боломжтой компонентууд
- `src/navigation`: Апп-ын навигацийн тохиргоо
- `src/screens`: Дэлгэцүүд
- `src/store`: Глобал төлөв (Zustand)
- `src/theme`: Өнгө, хэмжээ, стилийн тохиргоо
- `src/shared`: Driver апп-тай дундаа ашиглах кодууд

---
