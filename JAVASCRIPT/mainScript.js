var BrojKolone = 1;
var BrojReda = 1;
var KombinacijaKorisnika = [];
var TacnaKombinacija = [];
var PrviKlik = true;
var PozadinskaMuzika = document.createElement('audio');
var KlikAudio = document.createElement('audio');
var KoriscenaPomoc = false;
var Muzika = true;
var Zvuk = true;


$(document).ready(function () {

    odredi_TacnuKombinaciju();

    document.getElementById("skockoDugme").addEventListener("click", function () {
        unosZnaka("skocko");
    });
    document.getElementById("pikDugme").addEventListener("click", function () {
        unosZnaka("pik");
    });
    document.getElementById("trefDugme").addEventListener("click", function () {
        unosZnaka("tref");
    });
    document.getElementById("zvezdaDugme").addEventListener("click", function () {
        unosZnaka("zvezda");
    });
    document.getElementById("hercDugme").addEventListener("click", function () {
        unosZnaka("herc");
    });
    document.getElementById("karoDugme").addEventListener("click", function () {
        unosZnaka("karo");
    });

    document.getElementById("backspace").addEventListener("click", function () {
        backspace();
    });

    document.getElementById("enter").addEventListener("click", function () {
        enter();
    });

    document.getElementById("pomoc").addEventListener("click", function () {
        pomoc();
    });

    document.getElementById("refresh").addEventListener("click", function () {
        refresh();
    });

    document.getElementById("back").addEventListener("click", function () {
        back();
    });


});



function odredi_TacnuKombinaciju() {
    TacnaKombinacija[0] = brojUZnak(Math.floor((Math.random() * 6) + 1));
    TacnaKombinacija[1] = brojUZnak(Math.floor((Math.random() * 6) + 1));
    TacnaKombinacija[2] = brojUZnak(Math.floor((Math.random() * 6) + 1));
    TacnaKombinacija[3] = brojUZnak(Math.floor((Math.random() * 6) + 1));
    //alert(TacnaKombinacija[0] + " " + TacnaKombinacija[1] + " " + TacnaKombinacija[2] + " " + TacnaKombinacija[3]);
}

function brojUZnak(_broj) {
    var znak;
    switch (_broj) {
        case 1:
            znak = "karo";
            break;
        case 2:
            znak = "herc";
            break;
        case 3:
            znak = "zvezda";
            break;
        case 4:
            znak = "tref";
            break;
        case 5:
            znak = "pik";
            break;
        case 6:
            znak = "skocko";
            break;
    }
    return znak;
}
function pozadinskaMuzika() {
    PozadinskaMuzika.setAttribute('src', 'Content/Music/soundtrack.mp3');
    PozadinskaMuzika.loop = true;
    PozadinskaMuzika.volume = 0.5;
    PozadinskaMuzika.play();
}
function unosZnaka(_znak) {
    if (PrviKlik && Muzika) {
        pozadinskaMuzika()
        PrviKlik = false;
    }
    if (Zvuk) {
        KlikAudio.setAttribute('src', 'Content/Sounds/Click.mp3');
        KlikAudio.play();
    }
    //  alert("Unos znaka " +BrojKolone.toString() + " " + BrojReda.toString());
    if (BrojReda > 4) {       //        NE ZABORAVI DA UVEDES OGRANICENJE ZA KOLONE!
        return;
    }
    KombinacijaKorisnika.push(_znak);
    var polje = "#polje" + BrojKolone.toString() + BrojReda.toString();
    var slika = "Content/Images/" + _znak + ".png";
    $(polje).attr("src", slika);
    BrojReda++;
    //alert(KombinacijaKorisnika.length.toString());
}

function backspace() {
    if (Zvuk) {
        KlikAudio.setAttribute('src', 'Content/Sounds/Backspace.mp3');
        KlikAudio.play();
    }
    if (BrojReda == 1) {
        return;
    }
    BrojReda--;
    KombinacijaKorisnika.pop();
    var polje = "#polje" + BrojKolone.toString() + BrojReda.toString();
    $(polje).attr("src", "Content/Images/nista.png");
    //alert(KombinacijaKorisnika.length.toString());
}

function enter() {
    if (Zvuk) {
        KlikAudio.setAttribute('src', 'Content/Sounds/Enter.mp3');
        KlikAudio.play();
    }
    if (KombinacijaKorisnika.length == 4 && BrojKolone < 7) {
        uporedi();
        BrojKolone++;
        BrojReda = 1;
        KombinacijaKorisnika = [];
        if (BrojKolone == 7)
            prikaziTacnuKombinaciju();
    }
}

function uporedi() {
    var brojCrvenih = 0;
    var brojZutih = 0;

    var TacnaKombinacijaCopy = TacnaKombinacija.slice();
    for (var i = 0; i < 4; i++) {
        if (KombinacijaKorisnika[i] == TacnaKombinacijaCopy[i]) {
            brojCrvenih++;
            TacnaKombinacijaCopy[i] = "prazno";
            KombinacijaKorisnika[i] = "nista";
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (KombinacijaKorisnika[i] == TacnaKombinacijaCopy[j]) {
                brojZutih++;
                TacnaKombinacijaCopy[j] = "prazno";
                KombinacijaKorisnika[i] = "nista";
            }
        }
    }
    // alert(brojCrvenih.toString() + " " + brojZutih.toString())
    prikaziPogodke(brojCrvenih, brojZutih);
    if (brojCrvenih == 4 && KoriscenaPomoc == false) {
        prikaziTacnuKombinaciju();
        if (Zvuk) {
            KlikAudio.setAttribute('src', 'Content/Sounds/Win.mp3');
            KlikAudio.play();
        }
        alert("Cestitamo");
        //                                         PRIKAZI REZULTAT I CESTITAJ!
    }
}

function prikaziPogodke(_brojCrvenih, _brojZutih) {
    var red = 1;
    while (_brojCrvenih != 0) {
        $("#tacka" + BrojKolone.toString() + red.toString()).removeClass('sivaTacka');
        $("#tacka" + BrojKolone.toString() + red.toString()).addClass('crvenaTacka');
        _brojCrvenih--;
        red++;
    }
    while (_brojZutih != 0) {
        $("#tacka" + BrojKolone.toString() + red.toString()).removeClass('sivaTacka');
        $("#tacka" + BrojKolone.toString() + red.toString()).addClass('zutaTacka');
        _brojZutih--;
        red++;
    }
}

function prikaziTacnuKombinaciju() {
    for (var i = 1; i < 5; i++) {
        var nazivPolja = "#konacnoPolje" + i.toString();
        switch (TacnaKombinacija[i - 1]) {
            case "karo":
                $(nazivPolja).attr("src", "Content/Images/karo.png");
                break;
            case "herc":
                $(nazivPolja).attr("src", "Content/Images/herc.png");
                break;
            case "zvezda":
                $(nazivPolja).attr("src", "Content/Images/zvezda.png");
                break;
            case "tref":
                $(nazivPolja).attr("src", "Content/Images/tref.png");
                break;
            case "pik":
                $(nazivPolja).attr("src", "Content/Images/pik.png");
                break;
            case "skocko":
                $(nazivPolja).attr("src", "Content/Images/skocko.png");
                break;
        }
    }
}

function pomoc() {
    if (Zvuk) {
        KlikAudio.setAttribute('src', 'Content/Sounds/Help.mp3');
        KlikAudio.play();
    }
    KoriscenaPomoc = true;
    prikaziTacnuKombinaciju();
}

function refresh() {
    if (Zvuk) {
        KlikAudio.setAttribute('src', 'Content/Sounds/Refresh.mp3');
        KlikAudio.play();
    }
    odredi_TacnuKombinaciju();
    BrojKolone = 1;
    BrojReda = 1;
    KombinacijaKorisnika = [];
    KoriscenaPomoc = false;

    $("#konacnoPolje1").attr("src", "Content/Images/nista.png");
    $("#konacnoPolje2").attr("src", "Content/Images/nista.png");
    $("#konacnoPolje3").attr("src", "Content/Images/nista.png");
    $("#konacnoPolje4").attr("src", "Content/Images/nista.png");


    for (var i = 1; i < 7; i++) {
        for (var j = 1; j < 5; j++) {
            $("#polje" + i.toString() + j.toString()).attr("src", "Content/Images/nista.png");
            $("#tacka" + i.toString() + j.toString()).removeClass('zutaTacka');
            $("#tacka" + i.toString() + j.toString()).removeClass('crvenaTacka');
            $("#tacka" + i.toString() + j.toString()).addClass('sivaTacka');
        }
    }

}

function SoundSwitsh() {
    if (Zvuk == true) {
        Zvuk = false;
        $(gameSounds).attr("src", 'Content/Images/Mute.png');
    }
    else {
        Zvuk = true;
        $(gameSounds).attr("src", 'Content/Images/Sound.png');
    }
}


function MusicSwitsh() {
    if (Muzika == true) {
        PozadinskaMuzika.pause();
        Muzika = false;
        $(gameMusic).attr("src", 'Content/Images/noMusic.png');
    }
    else {
        pozadinskaMuzika()
        Muzika = true;
        $(gameMusic).attr("src", 'Content/Images/music.png');
    }
}

function back(){
    window.location = "index.html";
}