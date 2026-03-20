# YAKALA Launch Auth Checklist

Bu dokuman, launch oncesi Google OAuth gorunumunu markali domaine tasimak ve merkezi auth akislarini production seviyede son kez dogrulamak icindir.

## 1) Supabase plan ve custom auth domain

1. Supabase projesini Pro plana gecir.
2. `Project Settings > Custom Domains` (veya Auth altindaki ilgili bolum) icinden auth domain ekle:
   - `auth.yakala.io`
3. Supabase'in verdigi DNS kayitlarini domain saglayicisinda ekle:
   - CNAME
   - Gerekirse TXT verification kaydi
4. Supabase tarafinda `Verify` ile dogrulamayi tamamla.

## 2) Google OAuth client guncelleme

1. Google Cloud `yakala-auth` projesini ac.
2. `Google Auth Platform > Clients` icinde aktif Web OAuth client'i ac.
3. Authorized redirect URI listesine su URI'yi ekle (veya eski Supabase host URI'sini bununla degistir):
   - `https://auth.yakala.io/auth/v1/callback`
4. Kaydet.

## 3) Supabase Google provider baglantisi

1. Supabase `Authentication > Providers > Google` ekranini ac.
2. Kullanilan `Client ID` ve `Client Secret` degerlerinin Google Cloud'daki aktif client ile birebir ayni oldugunu kontrol et.
3. `Save` ile kaydet.

## 4) URL configuration kontrolu

Supabase `Authentication > URL Configuration`:

- Site URL:
  - `https://yakala.io` (veya canonical olarak kullandigin host)
- Redirect URLs:
  - `https://yakala.io/auth/callback`
  - `https://yakala.io/en/auth/callback`
  - `https://www.yakala.io/auth/callback`
  - `https://www.yakala.io/en/auth/callback`

## 5) Cache / propagation bekleme

1. DNS ve OAuth tarafi icin 5-15 dakika bekle.
2. Test hesaplarinda Google third-party app izinlerini temizle:
   - Google Account > Security > Third-party access > ilgili app kaydini kaldir.

## 6) UAT senaryolari (final)

1. Onaysiz kullanici:
   - Giris sonrasi full siteye degil coming soon + `Onay Bekleniyor` durumuna donmeli.
2. Onayli kullanici:
   - Giris sonrasi `/apps` acilmali.
   - Atanmis uygulamalar listelenmeli.
3. Dil/tema kontrolu:
   - TR/EN aktif etiketleri dark/light modda gorunur olmali.

## 7) Beklenen sonuc

- Google giris ekraninda random Supabase subdomain metni yerine markali auth domain gorunur.
- Merkezi auth akisi onay mekanizmasi ile beklendigi gibi calisir.
- Onayli kullanici urun merkezine, onaysiz kullanici bekleme akisina yonlenir.

