//1. Kısım

client.on('ready', async () => {

  client.api.applications(client.user.id).commands.post({
      data: {
          name: "otorol",
          description: "Otomatik rol verirsin ok.",
          options: [
            {
              name: "ayarla",
              description: "Oto rol ayarlar.",
              type: 1,
              options: [
                {
                  name: "kanal",
                  description: "Otorol logunu ayarlar",
                  type: 7,
                  required: true
                },
                {
                  name: "rol",
                  description: "Hangi rol verilcek onu ayarla tm :D",
                  type: 8,
                  required: true
                }
              ]
            },
            {
              name: "düzenle",
              description: "Ayarladığınız oto rolü düzenlersiniz.",
              type: 1,
              options: [
                {
                  name: "kanal",
                  description: "Otorol logunu ayarlar",
                  type: 7,
                  required: true
                },
                {
                  name: "rol",
                  description: "Hangi rol verilcek onu ayarla tm :D",
                  type: 8,
                  required: true
                }
              ]
            },
            {
              name: "sil",
              description: "Oto Rolü silersiniz.",
              type: 1
            }
          ]
        }
  });
  console.log("HAZIRIM KOMTANIM")
});





//2. Kısım




client.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;
      const db = require("quick.db");
      if (command == "otorol") {
        if (args[0].name == "ayarla") {
          let role = args[0].options[1].value
          let kanal = args[0].options[0].value
          let guild = client.guilds.cache.get(interaction.guild_id);

          if(!guild.members.cache.get(interaction.member.user.id).hasPermission("ADMINISTRATOR")) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Bu komudu sadece yöneticiler kullanabilir.**',timestamp: new Date(),}]}}});
          if(guild.channels.cache.get(kanal).type !== "text") return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Otorol kanalı metin kanalı olmalı. Salak**',timestamp: new Date(),}]}}});
          if(guild.roles.cache.get(role).position > guild.members.cache.get(client.user.id).roles.highest.position) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Bu rol benden yetkili amk :D?**',timestamp: new Date(),}]}}});
          
          db.set(`otorol_${interaction.guild_id}_rol`, role)
          db.set(`otorol_${interaction.guild_id}_kanal`, kanal)

          client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0x0099ff,description: '**Otorolü başarıyla ayarladım cikkssss**',timestamp: new Date(),}]}}})
        } else if (args[0].name == "düzenle"){ 
          let role = args[0].options[1].value
          let kanal = args[0].options[0].value
          let guild = client.guilds.cache.get(interaction.guild_id);

          let otorol = db.get(`otorol_${guild.id}_rol`)
          let otokanal = db.get(`otorol_${guild.id}_kanal`)

          if(!otorol) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Oto Rol ayarlı değil!**',timestamp: new Date(),}]}}});
          if(!otokanal) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Oto Rol ayarlı değil!**',timestamp: new Date(),}]}}});

          if(!guild.members.cache.get(interaction.member.user.id).hasPermission("ADMINISTRATOR")) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Bu komudu sadece yöneticiler kullanabilir.**',timestamp: new Date(),}]}}});
          if(guild.channels.cache.get(kanal).type !== "text") return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Otorol kanalı metin kanalı olmalı. Salak**',timestamp: new Date(),}]}}});
          if(guild.roles.cache.get(role).position > guild.members.cache.get(client.user.id).roles.highest.position) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Bu rol benden yetkili amk :D?*',timestamp: new Date(),}]}}});
          
          db.set(`otorol_${interaction.guild_id}_rol`, role)
          db.set(`otorol_${interaction.guild_id}_kanal`, kanal)

          client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0x0099ff,description: '**Otorolü başarıyla ayarladım cikkssss**',timestamp: new Date(),}]}}})

        } else if (args[0].name == "sil") {
          let guild = client.guilds.cache.get(interaction.guild_id);

          let otorol = db.get(`otorol_${guild.id}_rol`)
          let otokanal = db.get(`otorol_${guild.id}_kanal`)

          if(!otorol) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Oto Rol ayarlı değil!**',timestamp: new Date(),}]}}});
          if(!otokanal) return client.api.interactions(interaction.id, interaction.token).callback.post({data: {type: 4,data: {content: "",embeds: [{color: 0xFF3333,description: '**Oto Rol ayarlı değil!**',timestamp: new Date(),}]}}});
          
          db.delete(`otorol_${interaction.guild_id}_rol`)
          db.delete(`otorol_${interaction.guild_id}_kanal`)
        }
      }
  });

  client.on("guildMemberAdd", async (member) => {
    const db = require("quick.db");
    let guild = member.guild;
    let otorol = db.get(`otorol_${guild.id}_rol`)
    let otokanal = db.get(`otorol_${guild.id}_kanal`)

    console.log(otorol)
    console.log(otokanal)

    if(!otorol) return;
    if(!otokanal) return;

    let rol = guild.roles.cache.get(otorol)
    let kanal = guild.channels.cache.get(otokanal)

    if(!rol) return db.delete(`otorol_${guild.id}_rol`);
    if(!kanal) return db.delete(`otorol_${guild.id}_kanal`);

    member.roles.add(rol)
    .then(() => {
      kanal.send(`${member} **isimli kişi aramıza katıldı ve  \`${rol.name}\` rolü otomatik verildi. yine iyiyim he.**`).catch(err => { if(err) { db.delete(`otorol_${guild.id}_rol`); db.delete(`otorol_${guild.id}_kanal`); }})
    })
    .catch(err => { if(err) { db.delete(`otorol_${guild.id}_rol`); db.delete(`otorol_${guild.id}_kanal`); }})
  })
