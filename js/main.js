var CANVAS_WIDTH = 1500,
    CANVAS_HEIGHT = 640,
    EDGEBOARD_X = 300,
    EDGEBOARD_Y = 0,
    FPS_TIME = 1E3 / 24,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "arialbold",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    GAME_STATE_IDLE = 0,
    GAME_STATE_SPINNING = 1,
    GAME_STATE_SHOW_ALL_WIN = 2,
    GAME_STATE_SHOW_WIN = 3,
    REEL_STATE_START = 0,
    REEL_STATE_MOVING = 1,
    REEL_STATE_STOP = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    REEL_OFFSET_X = 380,
    REEL_OFFSET_Y = 84,
    NUM_REELS = 5,
    NUM_ROWS = 3,
    NUM_SYMBOLS = 8,
    WILD_SYMBOL = 8,
    NUM_PAYLINES = 20,
    SYMBOL_SIZE = 140,
    SPACE_BETWEEN_SYMBOLS = 10,
    MAX_FRAMES_REEL_EASE = 16,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
    REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET = .05,
    MAX_BET = .5,
    TOTAL_MONEY, SLOT_CASH, MIN_WIN, PAYTABLE_VALUES, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS;

function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
            var c = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_SIZE,
                    height: SYMBOL_SIZE,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(c)
        }
    };
    this._initPaylines = function() {
        s_aPaylineCombo = [
            [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }],
            [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }],
            [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }],
            [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }],
            [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }],
            [{ row: 1, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 1, col: 4 }],
            [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 1, col: 4 }],
            [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }],
            [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 1, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }],
            [{ row: 1, col: 0 }, { row: 2, col: 1 }, { row: 1, col: 2 }, { row: 0, col: 3 }, { row: 1, col: 4 }],
            [{ row: 2, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 3 }, { row: 1, col: 4 }],
            [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }],
            [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }],
            [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 0, col: 4 }],
            [{ row: 2, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }],
            [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }],
            [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 }],
            [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 2, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }],
            [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 0, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }],
            [{ row: 0, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 0, col: 4 }]
        ]
    };
    this._initSymbolWin = function() {
        s_aSymbolWin = [];
        s_aSymbolWin[0] = PAYTABLE_VALUES[0];
        s_aSymbolWin[1] = PAYTABLE_VALUES[1];
        s_aSymbolWin[2] = PAYTABLE_VALUES[2];
        s_aSymbolWin[3] = PAYTABLE_VALUES[3];
        s_aSymbolWin[4] = PAYTABLE_VALUES[4];
        s_aSymbolWin[5] = PAYTABLE_VALUES[5];
        s_aSymbolWin[6] = PAYTABLE_VALUES[6]
    };
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        var a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[1] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0,
                    1
                ],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(a);
        a = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(a)
    };
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(1);
        for (a = 0; 2 > a; a++) s_aRandSymbols.push(2);
        for (a = 0; 3 > a; a++) s_aRandSymbols.push(3);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(4);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(6);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(7);
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(8)
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HELP_WILD = "THIS SIMBOL IS A JOLLY WHICH CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
    var a, c, b, f, h, q, k, m, e, d;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.loadSprites();
        d = new createjs.Container;
        s_oStage.addChild(d)
        s_oMain.preloaderReady()
    };
    this.unload = function() {
        d.removeAllChildren();
        e.unload()
    };
    this._init()

}

function CMain(a) {
    var c, b = 0,
        f = 0,
        h = STATE_LOADING,
        q, k;
    this.initContainer = function() {
        var a = document.getElementById("canvas");
        s_oStage = new createjs.Stage(a);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        q = new CPreloader;
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        b === f && new CSlotSettings
    };

    this._initSounds = function() {
        var a = [];
        a.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
        });
        a.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win"
        });
        a.push({
            path: "./sounds/",
            filename: "reels",
            loop: !1,
            volume: 0.1,
            ingamename: "reels"
        });
        a.push({
            path: "./sounds/",
            filename: "reel_stop",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop"
        });
        a.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel"
        });
        f += a.length;
        s_aSounds = [];
        for (var b = 0; b < a.length; b++) s_aSounds[a[b].ingamename] = new Howl({
            src: [a[b].path + a[b].filename + ".mp3", a[b].path + a[b].filename + ".ogg"],
            autoplay: !1,
            preload: !0,
            loop: a[b].loop,
            volume: a[b].volume,
            onload: s_oMain.soundLoaded
        })
    };

    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded,
            this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but",
            "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) s_oSpriteLibrary.addSprite("symbol_" + a, "./sprites/symbol_" + a + ".png"), s_oSpriteLibrary.addSprite("symbol_" + a + "_anim", "./sprites/symbol_" + a + "_anim.png");
        for (a = 1; a < NUM_PAYLINES + 1; a++) s_oSpriteLibrary.addSprite("payline_" + a, "./sprites/payline_" + a + ".png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        b === f && new CSlotSettings
    };
    this._onAllImagesLoaded = function() {};
    this.gotoMenu = function() {
        new CMenu;
        h = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(m);
        h = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        h = STATE_HELP
    };
    this.getGame = function() {
	return k;
    }
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE &&
            !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(a) {
        if (!1 !== c) {
            var d = (new Date).getTime();
            s_iTimeElaps = d - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = d;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            h === STATE_GAME && k.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    var m = a;
    PAYTABLE_VALUES = [];
    for (var e = 0; 7 > e; e++) PAYTABLE_VALUES[e] = a["paytable_symbol_" + (e + 1)];
    ENABLE_FULLSCREEN = m.fullscreen;
    ENABLE_CHECK_ORIENTATION = m.check_orientation;
    SHOW_CREDITS = m.show_credits;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary;

function CTextButton(a, c, b, f, h, q, k, m) {
    var e, d, r, x, l, y, p, z;
    this._init = function(a, b, c, f, k, h, l) {
        e = !1;
        d = [];
        r = [];
        x = [];
        var n = createBitmap(c);
        z = new createjs.Text(f, l + "px " + k, h);
        z.textAlign = "center";
        z.textBaseline = "middle";
        z.x = c.width / 2;
        z.y = Math.floor(c.height / 2);
        p = new createjs.Container;
        p.x = a;
        p.y = b;
        p.regX = c.width / 2;
        p.regY = c.height / 2;
        p.addChild(n, z);
        B.addChild(p);
        s_bMobile || (p.cursor = "pointer");
        this._initListener()
    };
    this.unload = function() {
        p.off("mousedown", l);
        p.off("click", y);
        B.removeChild(p)
    };
    this.setVisible =
        function(a) {
            p.visible = a
        };
    this._initListener = function() {
        l = p.on("mousedown", this.buttonDown);
        y = p.on("click", this.buttonRelease)
    };
    this.addEventListener = function(a, d, b) {
        r[a] = d;
        x[a] = b
    };
    this.enable = function() {
        e = !1
    };
    this.disable = function() {
        e = !0
    };
    this.buttonRelease = function() {
        e || (p.scaleX = 1, p.scaleY = 1, playSound("press_but", 1, !1), r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(x[ON_MOUSE_UP], d[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        e || (p.scaleX = .9, p.scaleY = .9, r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(x[ON_MOUSE_DOWN],
            d[ON_MOUSE_DOWN]))
    };
    this.addEventListenerWithParams = function(a, b, c, e) {
        r[a] = b;
        x[a] = c;
        d[a] = e
    };
    this.setTextPosition = function(a) {
        z.y = a
    };
    this.setPosition = function(a, d) {
        p.x = a;
        p.y = d
    };
    this.setX = function(a) {
        p.x = a
    };
    this.setY = function(a) {
        p.y = a
    };
    this.getButtonImage = function() {
        return p
    };
    this.getX = function() {
        return p.x
    };
    this.getY = function() {
        return p.y
    };
    var B = m;
    this._init(a, c, b, f, h, q, k);
    return this
}

function CGfxButton(a, c, b) {
    var f, h, q, k, m = [],
        e;
    this._init = function(a, b, c) {
        q = [];
        k = [];
        e = createBitmap(c);
        e.x = a;
        e.y = b;
        e.regX = c.width / 2;
        e.regY = c.height / 2;
        s_bMobile || (e.cursor = "pointer");
        s_oStage.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", f);
        e.off("pressup", h);
        s_oStage.removeChild(e)
    };
    this.setVisible = function(a) {
        e.visible = a
    };
    this._initListener = function() {
        f = e.on("mousedown", this.buttonDown);
        h = e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        q[a] = b;
        k[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, e) {
        q[a] = b;
        k[a] = c;
        m = e
    };
    this.buttonRelease = function() {
        playSound("press_but", .3, !1);
        e.scaleX = 1;
        e.scaleY = 1;
        q[ON_MOUSE_UP] && q[ON_MOUSE_UP].call(k[ON_MOUSE_UP], m)
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], m)
    };
    this.setPosition = function(a, b) {
        e.x = a;
        e.y = b
    };
    this.setX = function(a) {
        e.x = a
    };
    this.setY = function(a) {
        e.y = a
    };
    this.getButtonImage = function() {
        return e
    };
    this.getX = function() {
        return e.x
    };
    this.getY = function() {
        return e.y
    };
    this._init(a, c, b);
    return this
}

function CToggle(a, c, b, f, h) {
    var q, k, m, e, d, r, x;
    this._init = function(a, b, d, c, f) {
        x = void 0 !== f ? f : s_oStage;
        k = [];
        m = [];
        f = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        q = c;
        e = createSprite(f, "state_" + q, d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        e.x = a;
        e.y = b;
        e.stop();
        s_bMobile || (e.cursor = "pointer");
        x.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", d);
        e.off("pressup", r);
        x.removeChild(e)
    };
    this._initListener = function() {
        d = e.on("mousedown", this.buttonDown);
        r = e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, d, b) {
        k[a] = d;
        m[a] = b
    };
    this.setCursorType = function(a) {
        e.cursor = a
    };
    this.setActive = function(a) {
        q = a;
        e.gotoAndStop("state_" + q)
    };
    this.buttonRelease = function() {
        e.scaleX = 1;
        e.scaleY = 1;
        playSound("press_but", 1, !1);
        q = !q;
        e.gotoAndStop("state_" + q);
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(m[ON_MOUSE_UP], q)
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, d) {
        e.x = a;
        e.y = d
    };
    this._init(a, c, b, f, h)
}

function CBetBut(a, c, b) {
    var f, h, q, k = [],
        m;
    this._init = function(a, d, b) {
        f = !1;
        h = [];
        q = [];
        b = s_oSpriteLibrary.getSprite("bet_but");
        var c = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        m = createSprite(c, "on", 0, 0, b.width / 2, b.height);
        m.stop();
        m.x = a;
        m.y = d;
        m.regX = b.width / 2;
        m.regY = b.height / 2;
        s_oStage.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown", this.buttonDown);
        m.off("pressup", this.buttonRelease);
        s_oStage.removeChild(m)
    };
    this.disable = function(a) {
        f = a
    };
    this.setVisible = function(a) {
        m.visible = a
    };
    this.setOn = function() {
        m.gotoAndStop("on")
    };
    this.setOff = function() {
        m.gotoAndStop("off")
    };
    this._initListener = function() {
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        h[a] = b;
        q[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, f) {
        h[a] = b;
        q[a] = c;
        k = f
    };
    this.buttonRelease = function() {
        h[ON_MOUSE_UP] && !1 === f && (playSound("press_but", 1, !1), h[ON_MOUSE_UP].call(q[ON_MOUSE_UP], k))
    };
    this.buttonDown = function() {
        h[ON_MOUSE_DOWN] && !1 === f && h[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN], k)
    };
    this.setPosition = function(a, b) {
        m.x = a;
        m.y = b
    };
    this.setX = function(a) {
        m.x = a
    };
    this.setY = function(a) {
        m.y = a
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this._init(a, c, b)
}

function CMenu() {
    var a, c, b, f, h, q, k = null,
        m = null,
        e, d, r, x, l, y;
    this._init = function() {
        e = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(e);
        var p = s_oSpriteLibrary.getSprite("but_bg");
        d = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, p, TEXT_PLAY, FONT_GAME, "#ffffff", "bold 40", s_oStage);
        d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), h = CANVAS_WIDTH - p.width / 4 - 10, q = p.height / 2 + 10, r = new CToggle(h,
            q, p, s_bAudioActive), r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (p = s_oSpriteLibrary.getSprite("but_credits"), a = p.height / 2 + 10, c = p.height / 2 + 10, x = new CGfxButton(a, c, p, s_oStage), x.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), b = a + p.width + 10, f = c) : (b = p.height / 2 + 10, f = p.height / 2 + 10);
        p = window.document;
        var z = p.documentElement;
        k = z.requestFullscreen || z.mozRequestFullScreen || z.webkitRequestFullScreen || z.msRequestFullscreen;
        m = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen ||
            p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (k = !1);
        k && screenfull.enabled && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), l = new CToggle(b, f, p, s_bFullscreen, s_oStage), l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        y = new createjs.Shape;
        y.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(y);
        createjs.Tween.get(y).to({
            alpha: 0
        }, 400).call(function() {
            y.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        d.unload();
        d = null;
        if (!1 ===
            DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), r = null;
        SHOW_CREDITS && x.unload();
        k && screenfull.enabled && l.unload();
        s_oStage.removeChild(e);
        e = null;
        s_oStage.removeChild(y);
        s_oMenu = y = null
    };
    this.refreshButtonPos = function(d, e) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || r.setPosition(h - d, e + q);
        SHOW_CREDITS && x.setPosition(a + d, c + e);
        k && screenfull.enabled && l.setPosition(b + d, f + e)
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    };
    this.resetFullscreenBut = function() {
        k && screenfull.enabled && l.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? m.call(window.document) : k.call(window.document.documentElement);
        sizeHandler()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var c = !1,
        b, f, h, q, k, m, e, d, r, x, l, y, p, z, B, A, E, N, H, t, F = null;
    this._init = function() {
        b = GAME_STATE_IDLE;
        y = q = f = 0;
        A = [0, 1, 2, 3, 4];
        h = A[0];
        k = NUM_PAYLINES;
        x = TOTAL_MONEY;
        d = MIN_BET;
        r = d * k;
        s_oTweenController = new CTweenController;
        N = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(N);
        this._initReels();
        H = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(H);
        t = new CInterface(d, r, x);
        this._initStaticSymbols();
        F = new CPayTablePanel;
        x < r && t.disableSpin();
        c = !0
    };
    this.unload = function() {
        stopSound("reels");
        t.unload();
        F.unload();
        for (var a = 0; a < p.length; a++) p[a].unload();
        for (a = 0; a < NUM_ROWS; a++)
            for (var b = 0; b < NUM_REELS; b++) z[a][b].unload();
        s_oStage.removeAllChildren()
    };
    this._initReels = function() {
        var a = REEL_OFFSET_X,
            b = REEL_OFFSET_Y,
            d = 0;
        p = [];
        for (var c = 0; c < NUM_REELS; c++) p[c] = new CReelColumn(c, a, b, d), p[c + NUM_REELS] = new CReelColumn(c + NUM_REELS, a, b + SYMBOL_SIZE * NUM_ROWS, d), a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS, d += REEL_DELAY
    };
    this._initStaticSymbols = function() {
        var a = REEL_OFFSET_X,
            b = REEL_OFFSET_Y;
        z = [];
        for (var d = 0; d < NUM_ROWS; d++) {
            z[d] = [];
            for (var c = 0; c < NUM_REELS; c++) {
                var f = new CStaticSymbolCell(d, c, a, b);
                z[d][c] = f;
                a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            a = REEL_OFFSET_X;
            b += SYMBOL_SIZE
        }
    };
    this.generateFinalSymbols = function() {
        E = [];
        for (var a = 0; a < NUM_ROWS; a++) {
            E[a] = [];
            for (var b = 0; b < NUM_REELS; b++)  {
		E[a][b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
	    }
        }
        B = [];
        for (a = l = 0; a < k; a++) {
            b = s_aPaylineCombo[a];
            var d = [],
                c = E[b[0].row][b[0].col],
                f = 1,
                e = 1;
            for (d.push({
                    row: b[0].row,
                    col: b[0].col,
                    value: E[b[0].row][b[0].col]
                }); c === WILD_SYMBOL && e < NUM_REELS;) f++, c = E[b[e].row][b[e].col], d.push({
                row: b[e].row,
                col: b[e].col,
                value: E[b[e].row][b[e].col]
            }), e++;
            for (; e < b.length; e++)
                if (E[b[e].row][b[e].col] === c || E[b[e].row][b[e].col] === WILD_SYMBOL) f++, d.push({
                    row: b[e].row,
                    col: b[e].col,
                    value: E[b[e].row][b[e].col]
                });
                else break;
            0 < s_aSymbolWin[c - 1][f - 1] && (l += s_aSymbolWin[c - 1][f - 1], B.push({
                line: a + 1,
                amount: s_aSymbolWin[c - 1][f - 1],
                num_win: f,
                value: c,
                list: d
            }))
        }
        return 0 < B.length ? !0 : !1
    };
    this._generateRandSymbols = function() {
        for (var a = [], b = 0; b < NUM_ROWS; b++) a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return a
    };
    this.reelArrived = function(a, b) {
        if (f > MIN_REEL_LOOPS)
            if (h === b) {
                if (!1 === p[a].isReadyToStop()) {
                    var d = a;
                    a < NUM_REELS ? (d += NUM_REELS, p[d].setReadyToStop(), p[a].restart([E[0][a], E[1][a], E[2][a]], !0)) : (d -= NUM_REELS, p[d].setReadyToStop(), p[a].restart([E[0][d], E[1][d], E[2][d]], !0))
                }
            } else p[a].restart(this._generateRandSymbols(), !1);
        else p[a].restart(this._generateRandSymbols(), !1), 0 === a && f++
    };
    this.stopNextReel =
        function() {
            q++;
            //0 === q % 2 && (playSound("reel_stop", 1, !1), h = A[q / 2], q === 2 * NUM_REELS && this._endReelAnimation())
            0 === q % 2 && (h = A[q / 2], q === 2 * NUM_REELS && this._endReelAnimation())
        };
    this._endReelAnimation = function() {
        stopSound("reels");
        t.disableBetBut(!1);
        q = f = 0;
        h = A[0];
        if (0 < B.length) {
            for (var a = 0; a < B.length; a++) {
                F.highlightCombo(B[a].value, B[a].num_win);
                t.showLine(B[a].line);
                for (var c = B[a].list, e = 0; e < c.length; e++) z[c[e].row][c[e].col].show(c[e].value)
            }
            l *= d;
            x += l;
            SLOT_CASH -= l;
            0 < l && (t.refreshMoney(x), t.refreshWinText(l));
            m = 0;
            b = GAME_STATE_SHOW_ALL_WIN;
            playSound("win", .3, !1)
        } else b =
            GAME_STATE_IDLE;
        t.enableGuiButtons();
        x < r && t.disableSpin();
        y++;
    };
    this.hidePayTable = function() {
        F.hide()
    };
    this._showWin = function() {
        if (0 < e) {
            stopSound("win");
            var a = B[e - 1].line;
            t.hideLine(a);
            a = B[e - 1].list;
            for (var b = 0; b < a.length; b++) z[a[b].row][a[b].col].stopAnim()
        }
        e === B.length && (e = 0);
        a = B[e].line;
        t.showLine(a);
        a = B[e].list;
        for (b = 0; b < a.length; b++) z[a[b].row][a[b].col].show(a[b].value);
        e++
    };
    this._hideAllWins = function() {
        for (var a =
                0; a < B.length; a++)
            for (var d = B[a].list, c = 0; c < d.length; c++) z[d[c].row][d[c].col].stopAnim();
        t.hideAllLines();
        e = m = 0;
        m = TIME_SHOW_WIN;
        b = GAME_STATE_SHOW_WIN
    };
    this.activateLines = function(a) {
        k = a;
        this.removeWinShowing();
        r = a = d * k;
        t.refreshTotalBet(r);
        t.refreshNumLines(k);
        a > x ? t.disableSpin() : t.enableSpin()
    };
    this.addLine = function() {
        k === NUM_PAYLINES ? k = 1 : k++;
        var a = d * k;
        r = a = parseFloat(a.toFixed(2));
        t.refreshTotalBet(r);
        t.refreshNumLines(k);
        a > x ? t.disableSpin() : t.enableSpin()
    };
    this.changeCoinBet = function() {
        var a = Math.floor(100 *
            (d + .05)) / 100;
        a > MAX_BET ? (d = MIN_BET, r = d * k, r = parseFloat(r.toFixed(2)), t.refreshBet(d), t.refreshTotalBet(r), a = r) : (a *= k, a = parseFloat(a.toFixed(2)), d += .05, d = Math.floor(100 * d) / 100, r = a, t.refreshBet(d), t.refreshTotalBet(r));
        a > x ? t.disableSpin() : t.enableSpin()
    };
    this.onMaxBet = function() {
        var a = MAX_BET;
        k = NUM_PAYLINES;
        a *= k;
        d = MAX_BET;
        r = a;
        t.refreshBet(d);
        t.refreshTotalBet(r);
        t.refreshNumLines(k);
        a > x ? t.disableSpin() : (t.enableSpin(), this.onSpin())
    };
    this.removeWinShowing =
        function() {
            F.resetHighlightCombo();
            t.resetWin();
            for (var a = 0; a < NUM_ROWS; a++)
                for (var d = 0; d < NUM_REELS; d++) z[a][d].hide();
            for (a = 0; a < p.length; a++) p[a].activate();
            b = GAME_STATE_IDLE
        };
    this.onSpin = function() {
        stopSound("win");
        playSound("reels", 0.3, !1);
        t.disableBetBut(!0);
        this.removeWinShowing();
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
        for (var a = 0; a < s_aSymbolWin.length; a++)
            for (var c = s_aSymbolWin[a], e = 0; e < c.length; e++) 0 !== c[e] && c[e] < MIN_WIN && (MIN_WIN = c[e]);
        MIN_WIN *= d;
        x -= r;
        t.refreshMoney(x);
        SLOT_CASH += r;
        if (SLOT_CASH < MIN_WIN) {
            do a = this.generateFinalSymbols(); while (!0 === a)
        } else {
            do a = this.generateFinalSymbols(); while (!1 === a || l * d > SLOT_CASH)
        }
        t.hideAllLines();
        t.disableGuiButtons();
        b = GAME_STATE_SPINNING
    };
    this.onInfoClicked =
        function() {
            b !== GAME_STATE_SPINNING && (F.isVisible() ? F.hide() : F.show())
        };
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu()
    };
    this.getState = function() {
        return b
    };
    this.update = function() {
        if (!1 !== c) switch (b) {
            case GAME_STATE_SPINNING:
                for (var a = 0; a < p.length; a++) p[a].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                m += s_iTimeElaps;
                m > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                m += s_iTimeElaps, m > TIME_SHOW_WIN && (m =
                    0, this._showWin())
        }
    };
    s_oGame = this;
    MIN_REEL_LOOPS = a.min_reel_loop;
    REEL_DELAY = a.reel_delay;
    TIME_SHOW_WIN = a.time_show_win;
    TIME_SHOW_ALL_WINS = a.time_show_all_wins;
    TOTAL_MONEY = a.money;
    SLOT_CASH = a.slot_cash;
    var I = a.ad_show_counter;
    this._init()
}
var s_oGame, s_oTweenController;

function CReelColumn(a, c, b, f) {
    var h, q, k, m, e, d, r, x, l, y, p, z, B, A;
    this._init = function(a, b, c, f) {
        k = q = h = !1;
        r = 0;
        m = a;
        d = f;
        e = m < NUM_REELS ? m : m - NUM_REELS;
        l = 0;
        y = MAX_FRAMES_REEL_EASE;
        x = REEL_STATE_START;
        p = c;
        z = p + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(b, c)
    };
    this.initContainer = function(a, b) {
        A = new createjs.Container;
        A.x = a;
        A.y = b;
        var d = 0;
        B = [];
        for (var c = 0; c < NUM_ROWS; c++) {
            var e = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            e.stop();
            e.x = 0;
            e.y = d;
            A.addChild(e);
            B[c] = e;
            d += SYMBOL_SIZE
        }
        s_oStage.addChild(A)
    };
    this.unload = function() {
        s_oStage.removeChild(A)
    };
    this.activate = function() {
        p = A.y;
        z = p + SYMBOL_SIZE * NUM_ROWS;
        h = !0
    };
    this._setSymbol = function(a) {
        A.removeAllChildren();
        for (var b = 0, d = 0; d < a.length; d++) {
            var c = new createjs.Sprite(s_aSymbolData[a[d]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            c.stop();
            c.x = 0;
            c.y = b;
            A.addChild(c);
            B[d] = c;
            b += SYMBOL_SIZE
        }
    };
    this.restart = function(a, b) {
        A.y = p = REEL_START_Y;
        z = p + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(a);
        if (q = b) {
            l = 0;
            y = MAX_FRAMES_REEL_EASE;
            x = REEL_STATE_STOP;
            for (var d = 0; d < NUM_ROWS; d++) B[d].gotoAndStop("static");
            k = !0
        } else
            for (d = 0; d < NUM_ROWS; d++) B[d].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        l = 0;
        y = MAX_FRAMES_REEL_EASE;
        x = REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return q
    };
    this._updateStart = function() {
        0 === l && m < NUM_REELS && playSound("start_reel", .3, !1);
        l++;
        l > y && (l = 0, y /= 2, x++, p = A.y, z = p + SYMBOL_SIZE * NUM_ROWS);
        var a = s_oTweenController.easeInBack(l, 0, 1, y);
        a = s_oTweenController.tweenValue(p, z, a);
        A.y = a
    };
    this._updateMoving =
        function() {
            l++;
            l > y && (l = 0, p = A.y, z = p + SYMBOL_SIZE * NUM_ROWS);
            var a = s_oTweenController.easeLinear(l, 0, 1, y);
            a = s_oTweenController.tweenValue(p, z, a);
            A.y = a
        };
    this._updateStopping = function() {
        l++;
	if (l == 1 && k) playSound("reel_stop", 1, !1);
        if (l >= y) h = !1, l = 0, y = MAX_FRAMES_REEL_EASE, x = REEL_STATE_START, r = 0, q = !1, k && (k = !1, A.y = REEL_OFFSET_Y), s_oGame.stopNextReel();
        else {
            var a = s_oTweenController.easeOutCubic(l, 0, 1, y);
            a = s_oTweenController.tweenValue(p, z, a);
            A.y = a
        }
    };
    this.update = function() {
        if (!1 !== h && (r++, r > d)) switch (!1 === q && A.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(m,
            e), x) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
        }
    };
    this._init(a, c, b, f)
}

function CInterface(a, c, b) {
    var f, h, q, k, m, e, d, r, x, l, y, p, z, B, A, E = null,
        N = null,
        H, t, F, I, n, K;
    this._init = function(a, b, c) {
        var u = s_oSpriteLibrary.getSprite("but_exit");
        q = CANVAS_WIDTH - u.width / 2 - 2;
        k = u.height / 2 + 2;
        x = new CGfxButton(q, k, u, !0);
        x.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (m = x.getX() - u.width, e = u.height / 2 + 2, z = new CToggle(m, e, s_oSpriteLibrary.getSprite("audio_icon"), s_bAudioActive), z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), f = m - u.width, h =
            e) : (f = x.getX() - u.width, h = u.height / 2 + 2);
        u = window.document;
        var L = u.documentElement;
        E = L.requestFullscreen || L.mozRequestFullScreen || L.webkitRequestFullScreen || L.msRequestFullscreen;
        N = u.exitFullscreen || u.mozCancelFullScreen || u.webkitExitFullscreen || u.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (E = !1);
        E && screenfull.enabled && (u = s_oSpriteLibrary.getSprite("but_fullscreen"), K = new CToggle(f, h, u, s_bFullscreen, s_oStage), K.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        u = s_oSpriteLibrary.getSprite("spin_but");

        l = new CTextButton(1026 + u.width / 2, 595, u, TEXT_SPIN, FONT_GAME, "#ffffff", 30, s_oStage);
        l.addEventListener(ON_MOUSE_UP, this._onSpin, this);

        u = s_oSpriteLibrary.getSprite("info_but");
        y = new CTextButton(296 + u.width / 2, 595, u, TEXT_INFO, FONT_GAME, "#ffffff", 30, s_oStage);
        y.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        u = s_oSpriteLibrary.getSprite("but_lines_bg");
        p = new CTextButton(436 + u.width / 2, 595, u, TEXT_LINES, FONT_GAME, "#ffffff", 30, s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        u = s_oSpriteLibrary.getSprite("coin_but");
        B = new CTextButton(620 + u.width / 2, 595, u, TEXT_COIN, FONT_GAME, "#ffffff", 30, s_oStage);
        B.addEventListener(ON_MOUSE_UP, this._onBet, this);
        u = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        A = new CTextButton(805 + u.width / 2, 595, u, TEXT_MAX_BET, FONT_GAME, "#ffffff", 30, s_oStage);
        A.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        t = new createjs.Text(TEXT_MONEY + "\n" + c.toFixed(2) + TEXT_CURRENCY, "24px " + FONT_GAME, "#ffde00");
        t.x = 408;
        t.y = 14;
        t.textAlign = "center";
        s_oStage.addChild(t);
        I = new createjs.Text(NUM_PAYLINES, "30px " +
            FONT_GAME, "#ffffff");
        I.x = 530;
        I.y = CANVAS_HEIGHT - 96;
        I.textAlign = "center";
        I.textBaseline = "alphabetic";
        s_oStage.addChild(I);
        H = new createjs.Text(a.toFixed(2), "30px " + FONT_GAME, "#ffffff");
        H.x = 712;
        H.y = CANVAS_HEIGHT - 96;
        H.textAlign = "center";
        H.textBaseline = "alphabetic";
        s_oStage.addChild(H);
        F = new createjs.Text(TEXT_BET + ": " + b.toFixed(2), "30px " + FONT_GAME, "#ffffff");
        F.x = 918;
        F.y = CANVAS_HEIGHT - 96;
        F.textAlign = "center";
        F.textBaseline = "alphabetic";
        s_oStage.addChild(F);
        n = new createjs.Text("", "24px " + FONT_GAME, "#ffde00");
        n.x = 1116;
        n.y = CANVAS_HEIGHT - 96;
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        s_oStage.addChild(n);
        u = s_oSpriteLibrary.getSprite("bet_but");
        d = [];
        a = u.height / 2;
        b = 84 + a;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        d[3] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        d[1] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked,
            this, 20);
        d[19] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        d[15] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        d[9] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        d[0] = c;
        b += 44;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        d[10] =
            c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        d[16] = c;
        b += 43;
        c = new CBetBut(319 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        d[2] = c;
        c = new CBetBut(319 + u.width / 2, b + 43, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        d[4] = c;
        b = 84 + a;
        c = new CBetBut(1130 + u.width / 2, b, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        d[13] = c;
        b += 43;
        c = new CBetBut(1130 +
            u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        d[11] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        d[8] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        d[17] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        d[5] = c;
        b += 44;
        c = new CBetBut(1130 + u.width / 2,
            b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        d[6] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        d[18] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        d[7] = c;
        b += 43;
        c = new CBetBut(1130 + u.width / 2, b, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        d[12] = c;
        c = new CBetBut(1130 + u.width / 2, b + 43, u, !0);
        c.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 15);
        d[14] = c;
        r = [];
        for (u = 0; u < NUM_PAYLINES; u++) a = createBitmap(s_oSpriteLibrary.getSprite("payline_" + (u + 1))), a.visible = !1, s_oStage.addChild(a), r[u] = a;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        x.unload();
        x = null;
        l.unload();
        l = null;
        y.unload();
        y = null;
        p.unload();
        p = null;
        B.unload();
        B = null;
        A.unload();
        A = null;
        !1 === DISABLE_SOUND_MOBILE && (z.unload(), z = null);
        E && screenfull.enabled && K.unload();
        for (var a = 0; a < NUM_PAYLINES; a++) d[a].unload();
        s_oInterface = null
    };
    this.refreshButtonPos =
        function(a, b) {
            x.setPosition(q - a, b + k);
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || z.setPosition(m - a, b + e);
            E && screenfull.enabled && K.setPosition(f - a, h + b)
        };
    this.refreshMoney = function(a) {
        t.text = TEXT_MONEY + "\n" + a.toFixed(2) + TEXT_CURRENCY
    };
    this.refreshBet = function(a) {
        H.text = a.toFixed(2)
    };
    this.refreshTotalBet = function(a) {
        F.text = TEXT_BET + ": " + a.toFixed(2)
    };
    this.refreshNumLines = function(a) {
        I.text = a;
        for (var b = 0; b < NUM_PAYLINES; b++) b < a ? (d[b].setOn(), r[b].visible = !0) : d[b].setOff();
        setTimeout(function() {
            for (var a =
                    0; a < NUM_PAYLINES; a++) r[a].visible = !1
        }, 1E3)
    };
    this.resetWin = function() {
        n.text = " "
    };
    this.refreshWinText = function(a) {
        n.text = TEXT_WIN + " " + a.toFixed(2) + TEXT_CURRENCY
    };
    this.showLine = function(a) {
        r[a - 1].visible = !0
    };
    this.hideLine = function(a) {
        r[a - 1].visible = !1
    };
    this.hideAllLines = function() {
        for (var a = 0; a < NUM_PAYLINES; a++) r[a].visible = !1
    };
    this.disableBetBut = function(a) {
        for (var b = 0; b < NUM_PAYLINES; b++) d[b].disable(a)
    };
    this.enableGuiButtons = function() {
        l.enable();
        A.enable();
        B.enable();
        p.enable();
        y.enable()
    };
    this.enableSpin =
        function() {
            l.enable();
            A.enable()
        };
    this.disableSpin = function() {
        l.disable();
        A.disable()
    };
    this.disableGuiButtons = function() {
        l.disable();
        A.disable();
        B.disable();
        p.disable();
        y.disable()
    };
    this._onBetLineClicked = function(a) {
        this.refreshNumLines(a);
        s_oGame.activateLines(a)
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._onSpin = function() {
        s_oGame.onSpin()
    };
    this._onAddLine = function() {
        s_oGame.addLine()
    };
    this._onInfo = function() {
        s_oGame.onInfoClicked()
    };
    this._onBet = function() {
        s_oGame.changeCoinBet()
    };
    this._onMaxBet =
        function() {
            s_oGame.onMaxBet()
        };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.resetFullscreenBut = function() {
        E && screenfull.enabled && K.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? N.call(window.document) : E.call(window.document.documentElement);
        sizeHandler()
    };
    s_oInterface = this;
    this._init(a, c, b);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, c, b, f, h;
    this._init = function() {
        h = new createjs.Container;
        f = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
        h.addChild(f);
        this._createPayouts();
        b = new createjs.Text(TEXT_HELP_WILD, "26px " + FONT_GAME, "#ffff00");
        b.textAlign = "center";
        b.lineWidth = 450;
        b.x = 986;
        b.y = 480;
        h.addChild(b);
        h.visible = !1;
        s_oStage.addChild(h);
        var a = this;
        h.on("pressup", function() {
            a._onExit()
        })
    };
    this.unload = function() {
        var b = this;
        h.off("pressup", function() {
            b._onExit()
        });
        s_oStage.removeChild(h);
        for (var f =
                0; f < a.length; f++) h.removeChild(a[f]);
        for (f = 0; f < c.length; f++) h.removeChild(c[f])
    };
    this._createPayouts = function() {
        a = [];
        c = [];
        for (var b = [{
                x: 450,
                y: 122
            }, {
                x: 450,
                y: 302
            }, {
                x: 450,
                y: 486
            }, {
                x: 780,
                y: 122
            }, {
                x: 780,
                y: 302
            }, {
                x: 1100,
                y: 122
            }, {
                x: 1100,
                y: 302
            }], f = 0, m = 0; m < s_aSymbolWin.length; m++) {
            for (var e = [], d = 0; d < s_aSymbolWin[m].length; d++) e[d] = s_aSymbolWin[m][d];
            do d = e.indexOf(0), -1 !== d && e.splice(d, 1); while (-1 !== d);
            d = e.length;
            if (0 !== d) {
                var r = 30;
                4 === d && (r = 22);
                var x = b[f].y;
                a[m] = [];
                c[m] = [];
                for (var l = 0; l < d; l++) {
                    var y = new createjs.Text("X" +
                        (5 - l), "25px " + FONT_GAME, "#ffffff");
                    y.textAlign = "center";
                    y.x = b[f].x;
                    y.y = x;
                    y.textBaseline = "alphabetic";
                    h.addChild(y);
                    a[m][l] = y;
                    var p = new createjs.Text(e[d - l - 1], "25px " + FONT_GAME, "#ffff00");
                    p.textAlign = "center";
                    p.x = y.x + 50;
                    p.y = y.y;
                    p.textBaseline = "alphabetic";
                    h.addChild(p);
                    c[m][l] = p;
                    x += r
                }
                f++
            }
        }
    };
    this.show = function() {
        h.visible = !0
    };
    this.hide = function() {
        h.visible = !1
    };
    this.resetHighlightCombo = function() {
        for (var b = 0; b < a.length; b++)
            for (var f = 0; f < a[b].length; f++) a[b][f].color = "#ffffff", c[b][f].color = "#ffff00",
                createjs.Tween.removeTweens(c[b][f]), c[b][f].alpha = 1
    };
    this.highlightCombo = function(a, b) {
        c[a - 1][NUM_REELS - b].color = "#ff0000";
        this.tweenAlpha(c[a - 1][NUM_REELS - b], 0)
    };
    this.tweenAlpha = function(a, b) {
        var c = this;
        createjs.Tween.get(a).to({
            alpha: b
        }, 200).call(function() {
            1 === b ? c.tweenAlpha(a, 0) : c.tweenAlpha(a, 1)
        })
    };
    this._onExit = function() {
        s_oGame.hidePayTable()
    };
    this.isVisible = function() {
        return h.visible
    };
    this._init()
}

function CStaticSymbolCell(a, c, b, f) {
    var h = -1,
        q, k, m, e;
    this._init = function(a, b, c, f) {
        e = new createjs.Container;
        e.visible = !1;
        k = [];
        for (a = 0; a < NUM_SYMBOLS; a++) b = createSprite(s_aSymbolAnims[a], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE), b.stop(), b.x = c, b.y = f, b.on("animationend", this._onAnimEnded, null, !1, {
            index: a
        }), e.addChild(b), k[a] = b, k[a].visible = !1;
        a = {
            framerate: 60,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1,
                    19
                ]
            }
        };
        a = new createjs.SpriteSheet(a);
        m = new createjs.Sprite(a, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        m.stop();
        m.x = c;
        m.y = f;
        e.addChild(m);
        s_oStage.addChild(e)
    };
    this.unload = function() {
        s_oStage.removeChild(e)
    };
    this.hide = function() {
        -1 < h && (m.gotoAndStop("static"), m.visible = !1, k[h].gotoAndPlay("static"), e.visible = !1)
    };
    this.show = function(a) {
        m.gotoAndPlay("anim");
        m.visible = !0;
        for (var b = 0; b < NUM_SYMBOLS; b++) k[b].visible = b + 1 === a ? !0 : !1;
        k[a - 1].gotoAndPlay("anim");
        h = a - 1;
        q = k[a - 1].spriteSheet.getNumFrames();
        e.visible = !0
    };
    this._onAnimEnded = function(a, b) {
        k[b.index].currentFrame !== q && (k[b.index].stop(), setTimeout(function() {
            k[b.index].gotoAndPlay(1)
        }, 100))
    };
    this.stopAnim = function() {
        k[h].gotoAndStop("static");
        k[h].visible = !1;
        m.gotoAndStop("static");
        m.visible = !1
    };
    this._init(a, c, b, f)
}

function CTweenController() {
    this.tweenValue = function(a, c, b) {
        return a + b * (c - a)
    };
    this.easeLinear = function(a, c, b, f) {
        return b * a / f + c
    };
    this.easeInCubic = function(a, c, b, f) {
        f = (a /= f) * a * a;
        return c + b * f
    };
    this.easeBackInQuart = function(a, c, b, f) {
        f = (a /= f) * a;
        return c + b * (2 * f * f + 2 * f * a + -3 * f)
    };
    this.easeInBack = function(a, c, b, f) {
        return b * (a /= f) * a * (2.70158 * a - 1.70158) + c
    };
    this.easeOutBack = function(a, c, b, f, h) {
        void 0 == h && (h = 1.70158);
        return b * ((a = a / f - 1) * a * ((h + 1) * a + h) + 1) + c
    };
    this.easeOutCubic = function(a, c, b, f) {
        return b * ((a = a / f - 1) *
            a * a + 1) + c
    }
}

function CCreditsPanel() {
    var a, c, b, f, h, q, k, m, e, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        s_oStage.addChild(d);
        var r = new createjs.Shape;
        r.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.addChild(r);
        c = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(c);
        k = new createjs.Shape;
        k.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = .01;
        k.on("click", this._onLogoButRelease);
        d.addChild(k);
        r = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH / 2 + 390;
        f = new CGfxButton(a, 185, r, d);
        f.addEventListener(ON_MOUSE_UP, this.unload, this);
        q = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#000");
        q.textAlign = "center";
        q.textBaseline = "alphabetic";
        q.x = CANVAS_WIDTH / 2;
        q.y = 270;
        q.outline = 3;
        d.addChild(q);
        h = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#fff");
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.x = CANVAS_WIDTH / 2;
        h.y = 270;
        d.addChild(h);
        r = s_oSpriteLibrary.getSprite("logo_ctl");
        b = createBitmap(r);
        b.regX = r.width / 2;
        b.regY = r.height / 2;
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2;
        d.addChild(b);
        e = new createjs.Text("www.yoctu.com", "34px " + FONT_GAME, "#000");
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.x = CANVAS_WIDTH / 2;
        e.y = 395;
        e.outline = 3;
        d.addChild(e);
        m = new createjs.Text("www.yoctu.com", "34px " + FONT_GAME, "#fff");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 395;
        d.addChild(m);
        createjs.Tween.get(d).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, b) {};
    this.unload = function() {
        k.off("click", this._onLogoButRelease);
        f.unload();
        f = null;
        s_oStage.removeChild(d)
    };
    this._onLogoButRelease = function() {
        window.open("https://www.yoctu.com", "_blank")
    };
    this._init()
}

