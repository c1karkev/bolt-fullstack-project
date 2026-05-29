-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Máj 29. 12:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshopproject`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `deliveryAddress` varchar(1023) DEFAULT NULL,
  `email` varchar(63) DEFAULT NULL,
  `phone` varchar(31) DEFAULT NULL,
  `taxAddress` varchar(255) DEFAULT NULL,
  `items` varchar(1023) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `deliveryAddress`, `email`, `phone`, `taxAddress`, `items`) VALUES
(1, '6724;Szeged;Gutenberg utca;11;A portán kérem leadni', 'teremberlo@vasvari.org', '+3614741111', '6724;Szeged;Gutenberg utca;11', '{\"5\":10}');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `imagePath` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `imagePath`) VALUES
(1, 'Fogkefe', 'A fogkefe a fogak mechanikus tisztítására használt eszköz. Minden fogkefének van feje és nyele. A fejen található sörték segítségével történik az ételmaradékok és lerakódások eltávolítása a fogak felszínéről. A fogkefék osztályozása általában a sörték anyaga és keménysége alapján történik. A sörték régebben állati eredetűek voltak, manapság kizárólag műanyagból készülnek. Három különböző keménységű fogkefét különböztetünk meg: lágy (soft), félkemény (medium) és kemény (hard). A lágy sörtéjű fogkefét az ínygyulladásos egyéneknek szokták ajánlani, míg a kemény sörtéjűt csak nagyon ritkán ajánlják.', 19000, 'fogkefe.jpg'),
(2, 'WC kefe', 'Több hely, még kis fürdőszobákban is – fúrás nélkül: WallStoris wc kefe tartó\r\n\r\nA WallStoris WC kefe tartó a hansgrohe intelligens kiegészítőinek része. Végül egy egyedi és stílusos megoldás található a fürdőszobában lévő összes tárgy tárolására, amely jól néz ki, tartós és rugalmas. Az Ön legnagyobb előnye: több hely még egy kis fürdőszobában is! A WallStoris WC kefe tartó ugyanolyan sokoldalú, mint a kiegészítők többi terméke: szabadon állhat a padlón, vagy a klasszikus módon rögzítheti csavarokkal vagy megbízható ragasztóval. A ragasztott hézag később maradék nélkül eltávolítható. Ez különösen praktikus megoldás, különösen bérlakásokban és mindenhol, ahol kerülni kell a csempékbe fúrást. A szükséges ragasztót a szállítás tartalmazza, és minden csempére, valamint fém- és üvegfelületre tapad.\r\nRugalmasan használható minden napra.\r\n\r\nA WallStoris kiegészítők igény szerint kombinálhatók és bővíthetők. Két különböző hosszúságú fali rudak, tárolódobozok, törülközőkampók, polcelemek és még sok más külön megvásárolható. A WC-kefe tartóhoz további tartozékokat is hozzáadhat, és több tárhelyet kaphat. A további polcok és kampók egyszerűen a fali rúdra rögzíthetők, és könnyen eltávolíthatók. A moduláris fürdőszobai kiegészítők matt fehér vagy matt fekete színben kaphatók.', 5000, 'wckefe.webp'),
(3, '16g Azbeszt', 'Egészségkárosító hatását viszonylag későn ismerték fel és bizonyították be. A levegőben a finom szemcsék lebegve oszlanak el, a már beépített szerkezetekből és anyagokból (pl. fékbetétekből) folyamatosan leválva távoznak szemcséi. A bányászat során az ivóvízbázisokba bekerülő bányavízből is kialakul szennyező hatása. Egészségkárosító hatása miatt a legtöbb iparilag fejlett államban, így hazánkban is az azbeszt felhasználását betiltották. Fékbetétek adalékanyagául ennek ellenére több helyen még használatban van.\r\n\r\nNemzetközi szervezetek véleménye kivonatosan a következő:\r\n\r\nAz 1999/77/EK irányelv kimondja, hogy „még nem állapították meg azt a küszöbértéket, amely alatt a krizotil-azbeszt nem jelent rákkeltő kockázatot”, illetve hogy „az emberi egészség védelmének hatékony módja a krizotil-azbesztszálak és ilyen szálakat tartalmazó termékek használatának betiltása”.\r\n\r\nAlátámasztja ezt a WHO, a Foglalkozás-egészségügyi Nemzetközi Bizottság (ICOH), Nemzetközi Rákkutatási Ügynökség (International Agency for Research on Cancer, IARC) véleménye is.\r\n\r\nAz ép, sérülésmentes azbeszttartalmú anyagok általában nem jelentenek egészségügyi kockázatot. Viszont, ha megsérülnek, vagy a normálistól bármilyen módon eltérnek, vagy az idő múlásával romlik az állaguk, állapotuk, azbeszt kerülhet a levegőbe.\r\n\r\nAz azbesztózison (ami a tüdőszövet azbesztpor belégzése miatt létrejövő, kiterjedt hegesedése) túl sokszorosára emeli a (hörgő eredetű) tüdőrákok és a mellhártya eredetű mezotelióma kifejlődésének kockázatát. Utóbbi nagyon sokáig lappanghat, tünetei sok más betegségé is lehetnek, ezért egyrészt nem derül ki időben, hogy kezelhessék, illetve jelenleg nem is létezik rá hatékony kezelés.[2]\r\n\r\nAz azbesztpala tetőfedő anyag élettartama végén kopik, porlad, és ha a külső felszínét le is fedjük, befelé változatlanul távozik, csak a lecserélése a jó megoldás. A régi azbesztpala csak védőintézkedések mellett bontható és szállítható. Azbesztmentesítést csak erre kiképzett szakvállalattal lehet elvégeztetni.\r\n\r\nA hasonló tulajdonságokkal rendelkező, de a szálak ipari előállításával készülő üveg- és kőzetgyapot rákkeltő hatását egyelőre nem mutatták ki. Az azbeszttel ellentétben a belélegzett mikroszálak ezeknél nem karomszerűek, nem tapadnak meg annyira a nyálkahártyán.', 100, 'azbeszt.jpg'),
(4, '4t homok', 'Cipőbe nem ajánlott, vizes zoknit használjon!', 9750, 'homok.jpg'),
(5, 'Oerlikon Skyranger®30', 'A Skyranger 30 egy kis hatótávolságú légvédelmi rendszer (VSHORAD), amelyet a német Rheinmetall vállalat fejleszt elsősorban drónok (UAV) elleni harcra. A rendszer egy radarral felszerelt távirányított lövegtoronyból, illetve annak irányító konzoljából áll. Ez utóbbiak a hordozó járműben kapott helyet a kétfős személyzettel együtt. A Skyranger 30 rendszer fegyverzetét egy 30 milliméteres KCE gépágyú és változattól függően 2 vagy 4 kis hatótávolságú légvédelmi rakéta adja. A gépágyúval legfeljebb 3 km, a rakétákkal pedig mintegy 8 kilométer távolságban repülő célokat támadhat. Opcionálisan lézerfegyver, illetve drónzavaró berendezés is beépíthető. A Skyranger 30 egy viszonylag kis méretű, platformfüggetlen rendszer, amely szinte bármelyik korszerű 6×6-os, 8×8-as hajtásképletű, vagy lánctalpas harcjárműbe beépíthető a megrendelő igényeinek megfelelően.\r\n\r\nA Skyranger 30 rendszert Lynx harcjárművekre telepítve a Magyar Honvédség is rendszeresíteni fogja várhatóan 2025–2026 körül.', 2147483647, 'skyrangerjpg.jpg'),
(6, 'Hatsune GPU', 'ASUS ROG Astral GeForce RTX 5080 16GB GDDR7 OC - Hatsune Miku Edition \r\nAz ASUS ROG Astral GeForce RTX 5080 – Hatsune Miku Edition egy egyedi megjelenésű modell, amely a ROG Axial-tech háromventilátoros hűtésre és a legújabb Ada architektúrára épülő grafikus teljesítményre támaszkodik. A 10 752 CUDA mag és a 2760 MHz-es boost órajel stabil működést kínál nagy terhelés alatt, miközben a GDDR7 memória 30 Gbit/s adatátviteli sebessége segíti a gyors képkocka-feldolgozást. A kártya kialakítása teljes méretű, többzónás világítással és a Miku-tematikára hangolt külsővel egészíti ki a műszaki alapokat.\r\n\r\nA 16 GB GDDR7 memória 256 bites buszon kapcsolódik a GPU-hoz, amely jól illeszkedik az olyan feladatokhoz, ahol egyszerre számít a gyors adatáramlás és a stabil képfeldolgozás. A csatlakozófelület PCI Express 5.0, amely a modern alaplapokkal széles körű kompatibilitást biztosít, míg a két HDMI 2.1b és három DisplayPort 2.1b csatlakozó akár négy kijelző egyidejű használatát is lehetővé teszi. A 7680×4320 pixeles maximális felbontás támogatása megfelelő keretet ad a nagyfrissítésű vagy nagyfelbontású monitorokhoz.\r\n\r\nA hűtést három Axial-tech ventilátor biztosítja, amelyek a hőterhelés egyenletes elosztására és a légáramlás növelésére lettek optimalizálva. A kártya fizikai felépítése robusztus, közel 2,9 kg-os tömegével jól illeszkedik a teljes méretű rendszerekbe. A működéshez 850 W rendszer-tápegység ajánlott, a csatlakoztatásról pedig egyetlen 16-pines tápcsatlakozó gondoskodik. A beépített világítás és a tematikus dizájn a műszaki tartalom mellett vizuálisan is karakteres elemmé teszi a modellt.', 749990, 'hatsunegpu.webp');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(63) DEFAULT NULL,
  `email` varchar(63) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`) VALUES
(1, 'Kardos Kevin', 'kardoskevin07@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$+C+01XNn0t42c1BHIApeCw$wcimvTamg5ud2OS3J5/Vx8jYe+ri8L4jAhTUBLnlOw8');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
