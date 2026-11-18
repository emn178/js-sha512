(function (sha512, sha384, sha512_256, sha512_224) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    sha512: {
      'ascii': {
        'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e': '',
        '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': 'The quick brown fox jumps over the lazy dog',
        '91ea1245f20d46ae9a037a989f54f1f790f0a47607eeb8a14d12890cea77a1bbc6c7ed9cf205e67b7f2b8fd4c7dfd3a7a8617e45f3c463d481c7e586c39ac1ed': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        'a8dedff31e3be9df6413ef5b4ecb93d62d3fbcb04297552eab5370e04afd45927854a4373037e81a50186e678d818c9ba824f4c850f3d0f02764af0252076979': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        '8b88efc2ebbcbdad5ac2d65af05bec57bda25e71fd5fb25bbd892057a2755fbd05d8d8491cb2946febd5b0f124ffdfbaecf7e34946353c4f1b5ab29545895468': '中文',
        'e1c6925243db76985abacaf9fa85e22697f549e67f65a36c88e4046a2260990ff9eefc3402396ea8dcbe8c592d8d5671bea612156eda38d3708d394bbd17d493': 'aécio',
        'f3e7ee9cdf7dbb52f7edd59ce3d49868c64f2b3aceceab060b8eaaebdf9de0dae5866d660e3319c5aad426a2176cb1703efc73eb24d1a90458ceda1b7f4e3940': '𠜎',
        '2665b06c3aa040d34e3ebeb8eb462a23e9789be9aa44c5242213f33c9bf18d391325de84cd91e1cb8b586739a9037acbf606eb8139a64e0244cdc4779faf62f7': 'Tehtäväsi on muotoilla teksti, jossa käyttäjälle suositellaan hänen henkilökohtaisiin tietoihinsa perustuen avioehdon tekemistä. Suosittelemme nimenomaan tätä tuotetta käyttäjän henkilökohtaisista tiedoista johtuen. Tuottamasi tekstin tulee olla lyhyt, persoonallinen, ymmärrettävä ja todenmukainen. Suositus perustuu seuraaviin seikkoihin:\n\nSeikka 0: Avioehdon tekeminen on verohyötyjen vuoksi suositeltavaa, koska olet ilmaissut että haluat kuoleman tapauksessa turvata ensisijaisesti aviopuolisosi asemaa (ennemmin kuin lasten asemaa). Avioehdolla voit määrätä, että puolet kuolleen puolison omaisuudesta siirtyy verovapaasti leskelle.\n\nVoit halutessasi hyödyntää seuraavia tietoja tekstin muotoilussa persoonallisemmaksi: Käyttäjällä on kumppani nimeltä PARTNER_NAME. Käyttäjällä on suurperhe. Käyttäjällä on lapsiperhe.\n\nPuhuttele käyttäjää siihen sävyyn että tiedät jo mitä käyttäjä haluaa, koska hän on kertonut toiveistaan, ja niiden perusteella tehty suositus on ilmiselvä. Joten älä käytä epävarmoja ilmaisuja kuten "halutessasi", vaan kirjoita itsevarmoilla ilmaisuilla kuten "koska haluat". Älä tee oletuksia käyttäjän sukupuolesta, emme tiedä onko hän mies vai nainen. Älä käytä sanaa jälkikasvu, puhu ennemmin lapsesta tai lapsista riippuen onko lapsia yksi vai useampia. Älä puhuttele käyttäjää ensimmäisessä persoonassa, käytä ennemmin passiivimuotoa. Tekstin sävyn tulisi olla neutraalin asiallinen, ei melodramaattinen eikä leikkisä. Pysy totuudessa, älä keksi uusia seikkoja yllä listattujen lisäksi. Viittaa ihmisiin nimillä silloin kun se on mahdollista. Tekstin tulisi olla vain muutaman lauseen mittainen. Älä siis kirjoita pitkiä selityksiä äläkä kirjoita listoja. Tiivistä oleellinen tieto lyhyeksi ja persoonalliseksi tekstiksi. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      },
      'UTF8 more than 64 bytes': {
        '6cb7f6d3381a187edadb43c7cdcfbbed4d2c213a7dce8ea08fe42b9882b64e643202b4974a6db94f94650ab9173d97c58bd59f6d19d27e01aab76d8d08855c65': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        'd24af1901aaf1458f089a6eddf784ce61c3012aee0df98bdb67ad2dc6b41a3b4051d40caac524373930ae396a2dde99a9204871b40892eea3e5f3c8d46da0c3c': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        'a58b6132677883b0ab565dfb4284a4441a35a0954738d90ad8c17800de5ee44f6482efd4c13e05a6e907fb830fc9d9039bd96f004e5e3e8d00802fb9448dec03': '012345678012345678012345678012345678012345678012345678012345012345678012345678012345678012345678012345678012345',
        '34a93615cbf314a799857dc9c1804ed04be60b481229ea3a53e00316e62ac7924ea7e65435cbd9fc7d8e10e0e52e56bd99ac571c1c470cbf9252bdd70b3fd8a3': '0123456780123456780123456780123456780123456780123456780123450123456780123456780123456780123456780123456780123456',
        '4555ce42c2e19f9a09a34b3e40f85178c22cde939ac42de4d33ca0e08e3c6a2e531a3abd9265a72cc22a19d085eb2c468c20d6cfb022d8914b53d6a2b485b7c9': '123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567',
        '8bfa769385fe4b7d4aabf304498522d5aefa5356e42e9ae5ac9fa6b00a483685586cc0fa44da3df335719cbb524b12433afda18361d70e4c584ea81a927c670c': '1234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678'
      },
      'Array': {
        'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e': [],
        '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    },
    sha384: {
      'ascii': {
        '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b': '',
        'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1': 'The quick brown fox jumps over the lazy dog',
        'ed892481d8272ca6df370bf706e4d7bc1b5739fa2177aae6c50e946678718fc67a7af2819a021c2fc34e91bdb63409d7': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        '3ab853dee5785c19346e8578d9cdb3b7258a8212c15fdf25d3055b4fbbc892a529e552788992fdae68dfa34f13f0af4e': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        '93422ceb8291a69b22f02dc1114c39a287493ad525dcebc77e4019a44eaee2633a85d0f29cd298ee6799048c33a4be0c': '中文',
        'a2146805faafc45b0055b49386768811c803ef9fa8a85b648e114276c1bf49ef1092ec1bc2d3f7e036238a97eace2087': 'aécio',
        'e929475cf9b4d73e2a2366146381ac779b17499c92ddf910e028eb9f30280878a2843643ed8a539af5dffed64143b93d': '𠜎'
      },
      'UTF8 more than 64 bytes': {
        '143f4bb1a89e576ea05bd8433a3903352c199bf6ef35bfa30afa1505d6fcef77476d1b1824105da160a5164b7c792328': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        '432a8d25efb1a8d463acc7bbbed57365cddc72de3cc19d42e1d260b1479770ecea9dd403fead2949d4fabb36939f263a': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        'a0ecc55799e1db4e7b30c2e78d445ada5ea2939d47e8aab51d6ae86cdcf93d5048b2666aa25fbaede7ec59ee59f46e88': '012345678012345678012345678012345678012345678012345678012345012345678012345678012345678012345678012345678012345',
        '484b51b9f03f453a08c823afea1a32434b6545fb682b0b91d94e1f4bf2812abc8a31387050a2e74909f862436b88c798': '0123456780123456780123456780123456780123456780123456780123450123456780123456780123456780123456780123456780123456',
        'e4c83d6e5e18b4391a0b2e5fab84234ce9fc1071d87a9dcf38ca050ca3635781ef1d65ad4f9a835df26d186384105eac': '123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567',
        'd7f6874057808f9e2eaa4eddace032c7bd548fbe3989be6591910277a25dee5972e1297deced3ad7b4e3040de88855f6': '1234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678'
      },
      'Array': {
        '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b': [],
        'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    },
    sha512_256: {
      'ascii': {
        'c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a': '',
        'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d': 'The quick brown fox jumps over the lazy dog',
        '1546741840f8a492b959d9b8b2344b9b0eb51b004bba35c0aebaac86d45264c3': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        '21e2e940930b23f1de6377086d07e22033c6bbf3fd9fbf4b62ec66e6c08c25be': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        'b6dab29c16ec35ab34a5d92ff135b58de96741dda78b1009a2181cf8b45d2f72': '中文',
        '122802ca08e39c2ef46f6a81379dc5683bd8aa074dfb54259f0add4d8b5504bc': 'aécio',
        '1032308151c0f4f5f8d4e0d96956352eb8ff87da98df8878d8795a858a7e7c08': '𠜎'
      },
      'UTF8 more than 64 bytes': {
        'd32a41d9858e45b68402f77cf9f3c3f992c36a4bffd230f78d666c87f97eaf7e': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        'bd1abad59e6b8ad69bc17b6e05aa13f0cb725467fbeb45b83d3e4094332d1367': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        'b8bd1d6cae9992f8619904683d54cbed560ec3ef2a33d8bc225175ec27dc09a4': '012345678012345678012345678012345678012345678012345678012345012345678012345678012345678012345678012345678012345',
        '4edb8bb93b959f482ce2e434585f3e164f53b00c42c4c46797445b39d225cfe3': '0123456780123456780123456780123456780123456780123456780123450123456780123456780123456780123456780123456780123456',
        '44da7ca023996ec4b4ded88410e4acc209ca26c34dc0f26550d28503974fe2d1': '123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567',
        '465859c0edc706a2a9c39d3175a715fdf6b764ccc43d45b5668c56f6d8aa9b9e': '1234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678'
      },
      'Array': {
        'c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a': [],
        'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    },
    sha512_224: {
      'ascii': {
        '6ed0dd02806fa89e25de060c19d3ac86cabb87d6a0ddd05c333b84f4': '',
        '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37': 'The quick brown fox jumps over the lazy dog',
        '6d6a9279495ec4061769752e7ff9c68b6b0b3c5a281b7917ce0572de': 'The quick brown fox jumps over the lazy dog.'
      },
      'ascii more than 64 bytes': {
        '2e962464977b198ee758d615bbc92251ad2e3c0960068e279fd21d2f': 'The MD5 message-digest algorithm is a widely used cryptographic hash function producing a 128-bit (16-byte) hash value, typically expressed in text format as a 32 digit hexadecimal number. MD5 has been utilized in a wide variety of cryptographic applications, and is also commonly used to verify data integrity.'
      },
      'UTF8': {
        '0f46a0ae7f226517dd66ece0ce1efa29ffb7ced05ac4566fdcaed188': '中文',
        '562f2e4ee7f7451d20dcc6a0ac1a1e1c4a75f09baaf1cf19af3e15f4': 'aécio',
        '0533318c52b3d4ad355c2a6c7e727ae3d2efa749db480ac33560b059': '𠜎'
      },
      'UTF8 more than 64 bytes': {
        'f67e191a5d4ee67a272ccaf6cf597f0c4d6a0c46bd631be7cadb0944': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一',
        '009c3d1e3172d6df71344982eada855421592aea28acbf660ada7569': '訊息摘要演算法第五版（英語：Message-Digest Algorithm 5，縮寫為MD5），是當前電腦領域用於確保資訊傳輸完整一致而廣泛使用的雜湊演算法之一（又譯雜湊演算法、摘要演算法等），主流程式語言普遍已有MD5的實作。'
      },
      'special length': {
        '36d6398ca22d885432e2fe3af53b9f83b2dc7a8e9284d65b81f7a879': '012345678012345678012345678012345678012345678012345678012345012345678012345678012345678012345678012345678012345',
        'd930407a742d10f70747f05271181ad6c1c92f87482ce6a494cb566a': '0123456780123456780123456780123456780123456780123456780123450123456780123456780123456780123456780123456780123456',
        '1d60954ce7bee0bf5d235fe6bfc928c0f32c0f1c4992451dbc0f4dbf': '123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567',
        '672aef84d579799cedf2fec090ce4ea0d72e0edd2788deaa8200fd67': '1234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678123456781234567812345678'
      },
      'Array': {
        '6ed0dd02806fa89e25de060c19d3ac86cabb87d6a0ddd05c333b84f4': [],
        '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    }
  };

  if (!(typeof JS_SHA512_NO_ARRAY_BUFFER === 'boolean' && JS_SHA512_NO_ARRAY_BUFFER)) {
    testCases.sha512['Uint8Array'] = {
      '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512['Int8Array'] = {
      '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512['ArrayBuffer'] = {
      'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e': new ArrayBuffer(0),
      'b8244d028981d693af7b456af8efa4cad63d282e19ff14942c246e50d9351d22704a802a71c3580b6370de4ceb293c324a8423342557d4e5c38438f0e36910ee': new ArrayBuffer(1)
    };
    testCases.sha384['Uint8Array'] = {
      'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha384['Int8Array'] = {
      'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha384['ArrayBuffer'] = {
      '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b': new ArrayBuffer(0),
      'bec021b4f368e3069134e012c2b4307083d3a9bdd206e24e5f0d86e13d6636655933ec2b413465966817a9c208a11717': new ArrayBuffer(1)
    };
    testCases.sha512_256['Uint8Array'] = {
      'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512_256['Int8Array'] = {
      'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512_256['ArrayBuffer'] = {
      'c672b8d1ef56ed28ab87c3622c5114069bdd3ad7b8f9737498d0c01ecef0967a': new ArrayBuffer(0),
      '10baad1713566ac2333467bddb0597dec9066120dd72ac2dcb8394221dcbe43d': new ArrayBuffer(1)
    };
    testCases.sha512_224['Uint8Array'] = {
      '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512_224['Int8Array'] = {
      '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.sha512_224['ArrayBuffer'] = {
      '6ed0dd02806fa89e25de060c19d3ac86cabb87d6a0ddd05c333b84f4': new ArrayBuffer(0),
      '283bb59af7081ed08197227d8f65b9591ffe1155be43e9550e57f941': new ArrayBuffer(1)
    };
  }

  if (typeof BUFFER === 'boolean' && BUFFER) {
    testCases.sha512['Buffer'] = {
      '07e547d9586f6a73f73fbac0435ed76951218fb7d0c8d788a309d785436bbb642e93a252a954f23912547d1e8a3b5ed6e1bfd7097821233fa0538f3db854fee6': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
    testCases.sha384['Buffer'] = {
      'ca737f1014a48f4c0b6dd43cb177b0afd9e5169367544c494011e3317dbf9a509cb1e5dc1e85a941bbee3d7f2afbc9b1': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
    testCases.sha512_256['Buffer'] = {
      'dd9d67b371519c339ed8dbd25af90e976a1eeefd4ad3d889005e532fc5bef04d': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
    testCases.sha512_224['Buffer'] = {
      '944cd2847fb54558d4775db0485a50003111c8e5daa63fe722c6aa37': new Buffer(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
  }

  testCases.sha512['UTF8 unpaired surrogates'] = {
    '7d59b7409d1bbb5a95488e1aecb317fba794ab5ab2c2c8e8f8aa00efc9c94a03ccae8884472d53e40d7c46727b1d07c71bf5c741e4215a5d5a076e23adc2d87e': '\ud800',
    '4d7fdee3b9f28d2289f1db90ee2ccab287d70a099bb4e91d255687a9971b58d343ebcf824b75e79909823244c7ccded8f22b41c3699b3bb531bcc0ae44ae2a2a': 'a\ud83db',
    '641aad781cc13694609943dba776c39ffe16ed9a253680e78aae3a462b68e4209517e8a765012cb7d4b6affd1ba65f3d3fd2bb21647e7e30023647160be12115': '\ud83d\ud83d\ude00\udfff',
    '152a01169805f03f8f9c0e534780a8769c8d35a0d9be9299a13edd311859f41f06f21ba96df70233ddddc7dcd9a616a0a6dc5cb2b36323ad48fe7c66e8da1353': Array(128).join('a') + '\ud800b'
  };
  testCases.sha512['UTF8 across block boundary'] = {
    'f5473326b3ff49988e132ba9129f7f4c130bea9be4be6b86d00c217c25aebf1e62eb084e3b25dbc07811724f456387a2df7c35ab6ef1e1928397c6db6842a563': Array(128).join('a') + 'é',
    '6bedbba0740c50627468976a5e8c5be75dc82698631bd1d1e5417d1f572f68fb4b2efc58136c2c783049fb232ba5976380e52eba4a057f50c04293e4a7099db3': Array(127).join('a') + '中',
    '5e7d1d5b92e48b21a6fdd910b9ea3da99bebf7d13b15622578aa97d89a9216d1fbe7bcef773041f25312b2ec950ae47d016fa6a6de53a904d4d467ceb9330bcb': Array(128).join('a') + '中',
    '5286e5b80ae850c13bdad8507cc8a6443609e6ef101fb655fcc47ee8f33f856fc3f977925e40e27ef1f2db8aee3e3a6ea925838b4ed5a6b3f2914c2c64767c24': Array(126).join('a') + '𠜎',
    'd3df270dc1db96d1b9b184e54974af47e2b69badf66ce9678088d10160577823011186660068c57eb003a25efb6244e6ae0f06406ec68cad458c138c41644b5d': Array(127).join('a') + '𠜎',
    'adad7b4c0580a140da5da4942ec5db95d4933908fc020f568f1af4ab17af4c6ae2634a2c5c05da0cd08d0c586cfca145fcf89d1479bda7306b1151b28f0ebc9c': Array(128).join('a') + '𠜎'
  };
  testCases.sha384['UTF8 unpaired surrogates'] = {
    '662bfffbe42f38b8ac82029816a5c1bf51a505c32b19fb90aa21c83a59ef8f4b7b41e72c5c2966bdf2926f00e16d9df8': '\ud800',
    '1b24a914be7fb0909203757fe7132d45dd0e4c4da229b97a8f620c9a8c0b1759075f58dc45232bde557b7ef75436799e': 'a\ud83db',
    '46c30927ac7ee643470297b812070d1e21522cd75e1caa604f7c75e238479d5a5f64d228323d165ee5fe2a51b49b8bb9': '\ud83d\ud83d\ude00\udfff',
    'e2a9bebab952af26ca750c35d6ef8b27f166c8f17185bc592b86568b2c84782a6ec195841419a2c3c2b0a438ebf3a845': Array(128).join('a') + '\ud800b'
  };
  testCases.sha384['UTF8 across block boundary'] = {
    '722b1af5a8556bf8aaca6d3d80e5c6a0c602e15e97cf94818637db3578e8c66bc280d76026a5ea5065e66abd7c037639': Array(128).join('a') + 'é',
    '156e3df3dfdb5c8973d00f8b5b0d4b70ddcb1569aa001dc8df99433c71cc4c1a303263ce4c77f9406be312adbb76a88b': Array(127).join('a') + '中',
    'bd47172201ffe3c94bbc485725f985f13dd1fc60140c34d8888bc7af6fb35d90f8d08c9f908be3f3ad92aa53588da1ca': Array(128).join('a') + '中',
    '67cff1351529845dd4694dc06d211594183c26e467fa64de922ae0f317f8fa2b252711517561729537d051cb10f72314': Array(126).join('a') + '𠜎',
    '28d32f121407f9c77ee9f6bc303e4e6f86916b67f5612fe33aba0f10878368c447aa6c417aa738d9412c929638deb16f': Array(127).join('a') + '𠜎',
    '6905d3234121e09535ee93883e191d44d81438e407a42cf18808291d5328e4f000fd62afc746f49369afedc3188c6337': Array(128).join('a') + '𠜎'
  };
  testCases.sha512_256['UTF8 unpaired surrogates'] = {
    '22c873668c8155ae26ca3115eb5cccb3b314e50cba0bc9ab38c897e41693f280': '\ud800',
    '50e6b13ccf27b8e9009d9d011855e0bdc24edd302b21b3d601a29d44800df27e': 'a\ud83db',
    '085b9e8ac8f7200d252635e20f802b5c487293bec8e74b08b83810b52dd603bf': '\ud83d\ud83d\ude00\udfff',
    'b959421a029397d0c774c3ac43d82ad30c960fbf9b1dcaf9a462ad7cce140244': Array(128).join('a') + '\ud800b'
  };
  testCases.sha512_256['UTF8 across block boundary'] = {
    'c9a126db9a4e30a1ca13a8eab58fb7da7a0fe0a170ccbbee7e00aa2fe8b2ecb9': Array(128).join('a') + 'é',
    '17013b4f01b74160c67523cee7e8d7dad07c0066512169b04a7982a7d0b1575c': Array(127).join('a') + '中',
    '246a43155c67088eda8b1a4837c62b0c22e73d71debf977cc2b6058050ef429b': Array(128).join('a') + '中',
    'f074b6bb1d4f018dbea707cf82b58af2785c17e8ce765d5f944dd3be912df81d': Array(126).join('a') + '𠜎',
    '1f945e41fda9ec9b25ca3379d22f0d5a2198aee369ece7ae13bddd993bc63578': Array(127).join('a') + '𠜎',
    '31c1e838cf1f9e1e14e800efac87094e42a1529a8a0ffbcd7d46f35adb0e130e': Array(128).join('a') + '𠜎'
  };
  testCases.sha512_224['UTF8 unpaired surrogates'] = {
    '42229b02ef923428c65760abf1ca123ceade920daf39545132ad3a56': '\ud800',
    '8f3dabf17609437aea7905afce7aaaae0ed617ef4e9121e1de5acb7e': 'a\ud83db',
    'd8038808ed35eaba2b3ab9ef4ecec7ac9d246869fe200d18d63c5a7e': '\ud83d\ud83d\ude00\udfff',
    '60868f7e12321094d2f90f6c88617d8fea478c769ffc3c9212554c75': Array(128).join('a') + '\ud800b'
  };
  testCases.sha512_224['UTF8 across block boundary'] = {
    '808911cbe9a128393d903ec2220ffc3b318f2a77e9b0a2e8523caa8f': Array(128).join('a') + 'é',
    '23a8fc62db1604c1c5b2d23d2f807bf3ec592f69fcdf56e5c51f70e9': Array(127).join('a') + '中',
    '5b496b1937cc14b4bb6c6677090318a8b6208e67d39fecfa70ec0588': Array(128).join('a') + '中',
    'd1817c54c8e95f71831863e7c82cca14666e75f30438fc75e74aff6d': Array(126).join('a') + '𠜎',
    '7eb33da3668966a1b4a63f289ee93f36f0a0dcabe30f0b54133af48a': Array(127).join('a') + '𠜎',
    '035c10dc775cb636add303757843640e247e8946a221c1bfd5a2426b': Array(128).join('a') + '𠜎'
  };

  if (!(typeof JS_SHA512_NO_ARRAY_BUFFER === 'boolean' && JS_SHA512_NO_ARRAY_BUFFER)) {
    testCases.sha512['ArrayBuffer view'] = {
      '96320ef62f00db5b54109915df45df70d44dd1ecda6a3b7d044d36df556b67f04bc1d07df1a3f528991a988b37116cea2e49987ca3b74b6d3c77ad13130089e4': new Int8Array([-1, -128, 127, 0, -2]),
      '0ea99ce81968900213ec53ef5f6207e5b2f55774816f02fe33d2a07fff71fb918a064b3541d75ca036c4d08158a0ddaf68a2468493b0c0394f43058a7b31e264': new Uint16Array(new Uint8Array([2, 1]).buffer),
      '33df2dcc31d35e7bc2568bebf5d73a1e43a0e624b651ba5ef3157bbfb728446674a231b8b6e97fa1e570c3b1de6d6c677541b262ac22afda5878fa2b591c7f08': new DataView(new Uint8Array([9, 72, 69, 76, 76, 79, 9]).buffer, 1, 5)
    };
    testCases.sha384['ArrayBuffer view'] = {
      '8c298435ac64e95cc9d90bd8646a97f63fb31af9c436c0e7ae36f21e6f9abeaf2cf1aa97fa8824a0d0d8d003e9986722': new Int8Array([-1, -128, 127, 0, -2]),
      '45a6f8ef0aacc113d35cce50c08f7e47724eb57b5d4455dca704a0e13b626432bd1f28f6733df1808af609f5620f848d': new Uint16Array(new Uint8Array([2, 1]).buffer),
      '338ef44a9ff34626247ec1e36ea906ec09dad827cc3e931bcc090a76767a9f7c3131e7900eaf4ba34d3fa58f3e0559df': new DataView(new Uint8Array([9, 72, 69, 76, 76, 79, 9]).buffer, 1, 5)
    };
    testCases.sha512_256['ArrayBuffer view'] = {
      '7a5b7bf2e9fbac7fad9aa692bfb440ef4143a8b1def39c87f375cc2935d1fb71': new Int8Array([-1, -128, 127, 0, -2]),
      '6fde0f18e202ebaa5a25064690f26b17410cf9a60fa9d179b3eb30dfcc453a2c': new Uint16Array(new Uint8Array([2, 1]).buffer),
      '0ed40219244e2af09aa8c6a7f70c7a7461fa9fcf9d3cff689509cc8a2d0d8ce6': new DataView(new Uint8Array([9, 72, 69, 76, 76, 79, 9]).buffer, 1, 5)
    };
    testCases.sha512_224['ArrayBuffer view'] = {
      '5836b7ad820dc45062f921a3621983acbc7b3f2adb91a7b3b352c8e3': new Int8Array([-1, -128, 127, 0, -2]),
      '559eb4432c2a7fd5e6dfc93d6a392864f4ec0e203e56ce0bf783b4f7': new Uint16Array(new Uint8Array([2, 1]).buffer),
      '49a0981de9ec617a4a64ed0a4757b3c4aaadf586394cb664a3c259e2': new DataView(new Uint8Array([9, 72, 69, 76, 76, 79, 9]).buffer, 1, 5)
    };
  }

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  var SPLIT = {
    'sha512': [
      '255cce5dff95a9f919c23e23d1255d92ce0a38c4f8abf18ca43e3da9010188fde62d587229500ad224e2c2b6b2b65e384929305330204d981f943973c624d9ff',
      '4d7fdee3b9f28d2289f1db90ee2ccab287d70a099bb4e91d255687a9971b58d343ebcf824b75e79909823244c7ccded8f22b41c3699b3bb531bcc0ae44ae2a2a'
    ],
    'sha384': [
      '2cd8dc532e2c456c439c74e78545d71eb21a4ce38e7801b20dc5a22500bb4915cd411425bd7f82386bfda5c55a7a9107',
      '1b24a914be7fb0909203757fe7132d45dd0e4c4da229b97a8f620c9a8c0b1759075f58dc45232bde557b7ef75436799e'
    ],
    'sha512_256': [
      '7dbad8838f5f1e1d925185146de720beb22c3c8431204c66a3ec84a1b4eca2d4',
      '50e6b13ccf27b8e9009d9d011855e0bdc24edd302b21b3d601a29d44800df27e'
    ],
    'sha512_224': [
      '84661383e33a07df597b7c1e5382dd233fccda138a2fcef01da68fa1',
      '8f3dabf17609437aea7905afce7aaaae0ed617ef4e9121e1de5acb7e'
    ]
  };

  var CLONE = {
    'sha512': '7e74aa295afb50e5f8d779e0a34d88186cf8f521227b33b039b0afb2f80756281535b483a3b1e8e124ae9998ee88e935c12ba35ff482d9449d0f84b67dd7d19c',
    'sha384': 'c0a31cf864cc46832807090e035a0f95301b5de056fe2c0f80db34372a7dadbecd6b578eb84184c83691ad53ae6c5076',
    'sha512_256': '35fc54b624dffb6d70cc897f6f1b4d5951fadbd9ca70c7909760d1b14de49429',
    'sha512_224': 'a22338091a4d3a2d3c4ea4b55f0fc04c3af7f2c564d59a4817622ed9'
  };

  function runTestCases(name, algorithm) {
    var methods = [
      {
        name: name,
        call: algorithm,
      },
      {
        name: name + '.hex',
        call: algorithm.hex
      },
      {
        name: name + '.array',
        call: function (message) {
          return algorithm.array(message).toHexString();
        }
      },
      {
        name: name + '.digest',
        call: function (message) {
          return algorithm.digest(message).toHexString();
        }
      },
      {
        name: name + '.arrayBuffer',
        call: function (message) {
          return algorithm.arrayBuffer(message).toHexString();
        }
      }
    ];

    var classMethods = [
      {
        name: 'create',
        call: function (message) {
          return algorithm.create().update(message).toString();
        }
      },
      {
        name: 'update',
        call: function (message) {
          return algorithm.update(message).toString();
        }
      },
      {
        name: 'hex',
        call: function (message) {
          return algorithm.update(message).hex();
        }
      },
      {
        name: 'array',
        call: function (message) {
          return algorithm.update(message).array().toHexString();
        }
      },
      {
        name: 'digest',
        call: function (message) {
          return algorithm.update(message).digest().toHexString();
        }
      },
      {
        name: 'arrayBuffer',
        call: function (message) {
          return algorithm.update(message).arrayBuffer().toHexString();
        }
      },
      {
        name: 'finalize',
        call: function (message) {
          var hash = algorithm.update(message);
          hash.hex();
          hash.finalize();
          return hash.hex();
        }
      },
      {
        name: 'clone',
        call: function (message) {
          var hash = algorithm.update(message);
          var hash2 = hash.clone();
          hash.update('any');
          return hash2.hex();
        }
      }
    ];

    var subTestCases = testCases[name];

    describe(name, function () {
      methods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      classMethods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      errorTestCases.forEach(function (testCase) {
        context('when ' + testCase, function () {
          it('should throw error', function () {
            expect(function () {
              algorithm(testCase);
            }).to.throwError(/input is invalid type/);
          });
        });
      });

      context('when update after finalize', function () {
        it('should throw error', function () {
          expect(function () {
            var hash = algorithm.update('any');
            hash.hex();
            hash.update('any');
          }).to.throwError(/finalize already called/);
        });
      });

      context('when a surrogate pair is split across updates', function () {
        it('should encode each unpaired half as U+FFFD', function () {
          expect(algorithm.update('a\ud83d').update('\ude00b').hex()).to.be(SPLIT[name][0]);
          expect(algorithm.update('a\ud83d').update('b').hex()).to.be(SPLIT[name][1]);
        });
      });

      context('when clone after a character crosses the block boundary', function () {
        it('should be equal', function () {
          var hash = algorithm.update(Array(128).join('a') + '\u4e2d');
          expect(hash.clone().update('xyz').hex()).to.be(CLONE[name]);
        });
      });

      context('when large size', function () {
        var hash = algorithm.create();
        hash.bytes = 4294967295;
        hash.update('any');
        expect(hash.hBytes).to.be(1);
      });
    });
  }

  runTestCases('sha512', sha512);
  runTestCases('sha384', sha384);
  runTestCases('sha512_256', sha512_256);
  runTestCases('sha512_224', sha512_224);
})(sha512, sha384, sha512_256, sha512_224);
