# Discord.JS V12 Slash Commands yapımı!
## Genel Rehber

---
Slash commands sistemi Discord'da yeni gelen bir güncellemedir. Önceden BUILT-IN adı altında geçen Clyde komutları artık tüm geliştiricilerin hizmetine sunuldu. Siz de botunuza bunlardan yapmak istiyorsanız bunu takip edebilirsiniz.

![/ ÖRNEK GÖRSEL](https://noydra.is-inside.me/JqZKaYfG.png)

---

Artık her geliştirici botuna bu özelliği yapabiliyor, fakat sunucuya ekleyen başka birisi ise botunuza EĞİK ÇİZGİ KOMUTLARI KULLAN iznini vermesini gerekiyor. Aşağıda Rythm botunun bazı slash komutlarını görebilirsiniz.

![/ ÖRNEK GÖRSEL](https://noydra.is-inside.me/DPBFqbH6.png)

---

## Tarif... Ay pardon yapım.

Slash commands ikiye ayrılır

1. Her yerde kullanılabilen (global) slash commads
2. Sunucuya özel olan slash commands

## 1. Global Slash Commands

Global komut yaptığınızda botun olduğu tüm sunucularda bu özellik kullanılabilir. Ama dediğim gibi sunucu sahibi bota bir izin vermelidir bunun dışında siz developer sitesinden bir kaç ayar yapmalısınız.

### Yapılacak ayarlar

* Öncelikle [Discord Developers](https://discord.com/developers/applications) sitesine girip discord hesabımızla oturum açıyoruz
* Ardından botumuzu seçiyoruz ([Bkz](https://noydra.is-inside.me/PWkAGaW7.png))
* Daha sonra sol taraftan OAuth2 kısmına giriyoruz ([OAUTH2](https://noydra.is-inside.me/w6rqbTAY.png))
* Aşağı kaydırın biraz ve orada **applications.commands** diye bir şey olacak, onu tikleyin tik tik. ([Görsel](https://noydra.is-inside.me/M65W1DPZ.png))
* Çıkan link slash commands izni açık bir davet linkidir. İstediğiniz sunucuya ekleyin. ([Görsel](https://noydra.is-inside.me/axvxtTUU.png))

Bot artık slash commands iznine sahip, komut oluşturmaya geçebiliriz.

---

## Global Komut Tarifi

Öncelikle bir bardak su... Pardon bu başka bir şeydi, global komut yapmak tereyağından kıl çekmek kadar kolay. Aşağıdaki kodu maininize atıp bir kez botunuzu açın, sonrasında kodu maininizden silebilirsiniz.

```javascript
client.on("ready", () => {
  client.api.applications(client.user.id).commands.post({data: {
      name: '31',
      description: 'komik sayı'
  }})
});
```

---

Bunu yaptıktan sonra botun izne sahip olduğu bir yerde / yaptığınızda slash commandınız çıkıyor.

![/ ÖRNEK GÖRSEL](https://noydra.is-inside.me/auHOPep1.png)

---
Komutu yaptınız, attınız. Bir bok olmadı mı? Napim. Şaka şaka, bir şey olmadı çünkü daha yawzılımımız bitmedi.

```javascript
client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  
  if (command == '31'){
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "ALKSJDHKQWJHSDKQWJD SJSJSJSJ"
        }
      }
    })
  }
});
```

Bunu da yaptığınızda bot artık komuta cevap verecektir. SJ
![/ ÖRNEK GÖRSEL](https://noydra.is-inside.me/RSwcFg6e.png)
---
## Global olmayan (Server-only) Slash commands

Bunun tek farkı sadece ayarladığınız sunucuda kullanılabilmesidir, sunucuya özel bot yapıyorsanız bu daha kullanışlu olur.

```javascript
client.on("ready", () => {
  client.api.applications(client.user.id)..guilds("SUNUCU ID")commands.post({data: {
      name: '31',
      description: 'komik sayı'
  }})
});
```

## Örnek otorol slash commands

* Botta slash izni olduğundan emin olun
* [main.js](https://github.com/noydra/discord.js-slash/main/main.js) deki "birinci kısım" isimli kodu botun mainine atıp reboot çekiyoruz. Ekranda "HAZIRIM KOMTANIM" yazarsa kodu silip reboot çekiyoruz.
* Ardından [main.js](https://github.com/noydra/discord.js-slash/main/main.js) deki "ikinci kısım" isimli kodu botun mainine atıyoruz. yazıları editleyebilirsiniz. reboot çekiyoruz bota.
* Bitti bu kadar, nasipte varmış.

#### Dipnot

* Bu olmazsa napim. Ama yeni geldiği için de olabilir. Napim işte.
* Bunları wikilerden forumlardan her ne boksa araştırdım. Siz de okumak isterseniz [habu linkten](https://discord.com/developers/docs/interactions/slash-commands) bakabilirsiniz :)
* Gidip v11 de yapmayı denemeyin sakın ha :D V12 için gelmiş bi sistem bu.
