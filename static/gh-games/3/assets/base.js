// Source Code: https://github.com/BinBashBanana/webretro
// please dont use IE
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if (!window.fetch || !indexedDB) {
	alert("Update your browser!");
	throw "Update your browser!";
}

var fsBundleDirs, fsBundleFiles, loadStatus, romName, isPaused, wasmReady, bundleReady, biosReady, romMode, core, wIdb, romUploadCallback, latestVersion, mainCompleted, currentManager, romUploadsReady, realRomExt, currentTheme;
var bundleCdn = "https://cdn.jsdelivr.net/gh/BinBashBanana/webretro@master/";
var bundleCdnLatest = "https://cdn.jsdelivr.net/gh/BinBashBanana/webretro/";
var biosCdn = "https://cdn.jsdelivr.net/gh/archtaurus/RetroPieBIOS@master/BIOS/";
var infoJsonUrl = "https://cdn.jsdelivr.net/gh/BinBashBanana/webretro/assets/info.json";
var standaloneDownloadUrl = "https://cdn.jsdelivr.net/gh/BinBashBanana/webretro/utils/webretro-standalone.html";
var relativeBase = (typeof relativeBase == "string") ? relativeBase : "";
var coreDir = "cores/";
var bioses = {"a5200": {path: "", files: ["5200.rom"]}, "atari800": {path: "", files: ["5200.rom"]}, "freechaf": {path: "", files: ["sl31253.bin", "sl31254.bin", "sl90025.bin"]}, "freeintv": {path: "", files: ["exec.bin", "grom.bin"]}, "gearcoleco": {path: "", files: ["colecovision.rom"]}, "handy": {path: "", files: ["lynxboot.img"]}, "mednafen_psx": {path: "", files: ["scph5500.bin", "scph5501.bin", "scph5502.bin"]}, "mednafen_psx_hw": {path: "", files: ["scph5500.bin", "scph5501.bin", "scph5502.bin"]}, "neocd": {path: "neocd/", files: ["neocd_z.rom"]}, "o2em": {path: "", files: ["c52.bin", "g7400.bin", "jopac.bin", "o2rom.bin"]}, "opera": {path: "", files: ["panafz10-norsa.bin", "panafz10ja-anvil-kanji.bin"]}, "px68k": {path: "keropi/", files: ["cgrom.dat", "iplrom.dat", "iplrom30.dat", "iplromco.dat", "iplromxv.dat"]}, "yabasanshiro": {path: "", files: ["saturn_bios.bin"]}, "yabause": {path: "", files: ["saturn_bios.bin"]}};
var defaultKeybinds = 'input_player1_start = "enter"\ninput_player1_select = "space"\ninput_player1_l = "e"\ninput_player1_l2 = "r"\ninput_player1_r = "p"\ninput_player1_r2 = "o"\ninput_player1_a = "h"\ninput_player1_b = "g"\ninput_player1_x = "y"\ninput_player1_y = "t"\ninput_player1_up = "up"\ninput_player1_left = "left"\ninput_player1_down = "down"\ninput_player1_right = "right"\ninput_player1_l_x_minus = "a"\ninput_player1_l_x_plus = "d"\ninput_player1_l_y_minus = "w"\ninput_player1_l_y_plus = "s"\ninput_player1_l3_btn = "x"\ninput_player1_r_x_minus = "j"\ninput_player1_r_x_plus = "l"\ninput_player1_r_y_minus = "i"\ninput_player1_r_y_plus = "k"\ninput_player1_r3_btn = "comma"\ninput_menu_toggle = "f1"\ninput_save_state = "f2"\ninput_load_state = "f3"\ninput_screenshot = "f4"\ninput_hold_fast_forward = "nul"\ninput_toggle_fast_forward = "nul"\ninput_hold_slowmotion = "nul"\ninput_toggle_slowmotion = "nul"\ninput_grab_mouse_toggle = "backslash"\ninput_game_focus_toggle = "tilde"\n';
var nulKeys = 'input_ai_service = "nul"\ninput_ai_service_axis = "nul"\ninput_ai_service_btn = "nul"\ninput_ai_service_mbtn = "nul"\ninput_audio_mute = "nul"\ninput_audio_mute_axis = "nul"\ninput_audio_mute_btn = "nul"\ninput_audio_mute_mbtn = "nul"\ninput_cheat_index_minus = "nul"\ninput_cheat_index_minus_axis = "nul"\ninput_cheat_index_minus_btn = "nul"\ninput_cheat_index_minus_mbtn = "nul"\ninput_cheat_index_plus = "nul"\ninput_cheat_index_plus_axis = "nul"\ninput_cheat_index_plus_btn = "nul"\ninput_cheat_index_plus_mbtn = "nul"\ninput_cheat_toggle = "nul"\ninput_cheat_toggle_axis = "nul"\ninput_cheat_toggle_btn = "nul"\ninput_cheat_toggle_mbtn = "nul"\ninput_desktop_menu_toggle = "nul"\ninput_desktop_menu_toggle_axis = "nul"\ninput_desktop_menu_toggle_btn = "nul"\ninput_desktop_menu_toggle_mbtn = "nul"\ninput_disk_eject_toggle = "nul"\ninput_disk_eject_toggle_axis = "nul"\ninput_disk_eject_toggle_btn = "nul"\ninput_disk_eject_toggle_mbtn = "nul"\ninput_disk_next = "nul"\ninput_disk_next_axis = "nul"\ninput_disk_next_btn = "nul"\ninput_disk_next_mbtn = "nul"\ninput_disk_prev = "nul"\ninput_disk_prev_axis = "nul"\ninput_disk_prev_btn = "nul"\ninput_disk_prev_mbtn = "nul"\ninput_duty_cycle = "nul"\ninput_enable_hotkey = "nul"\ninput_enable_hotkey_axis = "nul"\ninput_enable_hotkey_btn = "nul"\ninput_enable_hotkey_mbtn = "nul"\ninput_exit_emulator = "nul"\ninput_exit_emulator_axis = "nul"\ninput_exit_emulator_btn = "nul"\ninput_exit_emulator_mbtn = "nul"\ninput_fps_toggle = "nul"\ninput_fps_toggle_axis = "nul"\ninput_fps_toggle_btn = "nul"\ninput_fps_toggle_mbtn = "nul"\ninput_frame_advance = "nul"\ninput_frame_advance_axis = "nul"\ninput_frame_advance_btn = "nul"\ninput_frame_advance_mbtn = "nul"\ninput_game_focus_toggle_axis = "nul"\ninput_game_focus_toggle_btn = "nul"\ninput_game_focus_toggle_mbtn = "nul"\ninput_grab_mouse_toggle_axis = "nul"\ninput_grab_mouse_toggle_btn = "nul"\ninput_grab_mouse_toggle_mbtn = "nul"\ninput_hold_fast_forward_axis = "nul"\ninput_hold_fast_forward_btn = "nul"\ninput_hold_fast_forward_mbtn = "nul"\ninput_slowmotion = "nul"\ninput_hold_slowmotion_axis = "nul"\ninput_hold_slowmotion_btn = "nul"\ninput_hold_slowmotion_mbtn = "nul"\ninput_hotkey_block_delay = "nul"\ninput_load_state_axis = "nul"\ninput_load_state_btn = "nul"\ninput_load_state_mbtn = "nul"\ninput_menu_toggle_axis = "nul"\ninput_menu_toggle_btn = "nul"\ninput_menu_toggle_mbtn = "nul"\ninput_movie_record_toggle = "nul"\ninput_movie_record_toggle_axis = "nul"\ninput_movie_record_toggle_btn = "nul"\ninput_movie_record_toggle_mbtn = "nul"\ninput_netplay_game_watch = "nul"\ninput_netplay_game_watch_axis = "nul"\ninput_netplay_game_watch_btn = "nul"\ninput_netplay_game_watch_mbtn = "nul"\ninput_netplay_host_toggle = "nul"\ninput_netplay_host_toggle_axis = "nul"\ninput_netplay_host_toggle_btn = "nul"\ninput_netplay_host_toggle_mbtn = "nul"\ninput_osk_toggle = "nul"\ninput_osk_toggle_axis = "nul"\ninput_osk_toggle_btn = "nul"\ninput_osk_toggle_mbtn = "nul"\ninput_overlay_next = "nul"\ninput_overlay_next_axis = "nul"\ninput_overlay_next_btn = "nul"\ninput_overlay_next_mbtn = "nul"\ninput_pause_toggle = "nul"\ninput_pause_toggle_axis = "nul"\ninput_pause_toggle_btn = "nul"\ninput_pause_toggle_mbtn = "nul"\ninput_player1_a_axis = "nul"\ninput_player1_a_btn = "nul"\ninput_player1_a_mbtn = "nul"\ninput_player1_b_axis = "nul"\ninput_player1_b_btn = "nul"\ninput_player1_b_mbtn = "nul"\ninput_player1_down_axis = "nul"\ninput_player1_down_btn = "nul"\ninput_player1_down_mbtn = "nul"\ninput_player1_gun_aux_a = "nul"\ninput_player1_gun_aux_a_axis = "nul"\ninput_player1_gun_aux_a_btn = "nul"\ninput_player1_gun_aux_a_mbtn = "nul"\ninput_player1_gun_aux_b = "nul"\ninput_player1_gun_aux_b_axis = "nul"\ninput_player1_gun_aux_b_btn = "nul"\ninput_player1_gun_aux_b_mbtn = "nul"\ninput_player1_gun_aux_c = "nul"\ninput_player1_gun_aux_c_axis = "nul"\ninput_player1_gun_aux_c_btn = "nul"\ninput_player1_gun_aux_c_mbtn = "nul"\ninput_player1_gun_dpad_down = "nul"\ninput_player1_gun_dpad_down_axis = "nul"\ninput_player1_gun_dpad_down_btn = "nul"\ninput_player1_gun_dpad_down_mbtn = "nul"\ninput_player1_gun_dpad_left = "nul"\ninput_player1_gun_dpad_left_axis = "nul"\ninput_player1_gun_dpad_left_btn = "nul"\ninput_player1_gun_dpad_left_mbtn = "nul"\ninput_player1_gun_dpad_right = "nul"\ninput_player1_gun_dpad_right_axis = "nul"\ninput_player1_gun_dpad_right_btn = "nul"\ninput_player1_gun_dpad_right_mbtn = "nul"\ninput_player1_gun_dpad_up = "nul"\ninput_player1_gun_dpad_up_axis = "nul"\ninput_player1_gun_dpad_up_btn = "nul"\ninput_player1_gun_dpad_up_mbtn = "nul"\ninput_player1_gun_offscreen_shot = "nul"\ninput_player1_gun_offscreen_shot_axis = "nul"\ninput_player1_gun_offscreen_shot_btn = "nul"\ninput_player1_gun_offscreen_shot_mbtn = "nul"\ninput_player1_gun_select = "nul"\ninput_player1_gun_select_axis = "nul"\ninput_player1_gun_select_btn = "nul"\ninput_player1_gun_select_mbtn = "nul"\ninput_player1_gun_start = "nul"\ninput_player1_gun_start_axis = "nul"\ninput_player1_gun_start_btn = "nul"\ninput_player1_gun_start_mbtn = "nul"\ninput_player1_gun_trigger = "nul"\ninput_player1_gun_trigger_axis = "nul"\ninput_player1_gun_trigger_btn = "nul"\ninput_player1_gun_trigger_mbtn = "nul"\ninput_player1_l2_axis = "nul"\ninput_player1_l2_btn = "nul"\ninput_player1_l2_mbtn = "nul"\ninput_player1_l3 = "nul"\ninput_player1_l3_axis = "nul"\ninput_player1_l3_mbtn = "nul"\ninput_player1_l_axis = "nul"\ninput_player1_l_btn = "nul"\ninput_player1_l_mbtn = "nul"\ninput_player1_l_x_minus_axis = "nul"\ninput_player1_l_x_minus_btn = "nul"\ninput_player1_l_x_minus_mbtn = "nul"\ninput_player1_l_x_plus_axis = "nul"\ninput_player1_l_x_plus_btn = "nul"\ninput_player1_l_x_plus_mbtn = "nul"\ninput_player1_l_y_minus_axis = "nul"\ninput_player1_l_y_minus_btn = "nul"\ninput_player1_l_y_minus_mbtn = "nul"\ninput_player1_l_y_plus_axis = "nul"\ninput_player1_l_y_plus_btn = "nul"\ninput_player1_l_y_plus_mbtn = "nul"\ninput_player1_left_axis = "nul"\ninput_player1_left_mbtn = "nul"\ninput_player1_r2_axis = "nul"\ninput_player1_r2_btn = "nul"\ninput_player1_r2_mbtn = "nul"\ninput_player1_r3 = "nul"\ninput_player1_r3_axis = "nul"\ninput_player1_r3_mbtn = "nul"\ninput_player1_r_axis = "nul"\ninput_player1_r_btn = "nul"\ninput_player1_r_mbtn = "nul"\ninput_player1_r_x_minus_axis = "nul"\ninput_player1_r_x_minus_btn = "nul"\ninput_player1_r_x_minus_mbtn = "nul"\ninput_player1_r_x_plus_axis = "nul"\ninput_player1_r_x_plus_btn = "nul"\ninput_player1_r_x_plus_mbtn = "nul"\ninput_player1_r_y_minus_axis = "nul"\ninput_player1_r_y_minus_btn = "nul"\ninput_player1_r_y_minus_mbtn = "nul"\ninput_player1_r_y_plus_axis = "nul"\ninput_player1_r_y_plus_btn = "nul"\ninput_player1_r_y_plus_mbtn = "nul"\ninput_player1_right_axis = "nul"\ninput_player1_right_mbtn = "nul"\ninput_player1_select_axis = "nul"\ninput_player1_select_btn = "nul"\ninput_player1_select_mbtn = "nul"\ninput_player1_start_axis = "nul"\ninput_player1_start_btn = "nul"\ninput_player1_start_mbtn = "nul"\ninput_player1_turbo = "nul"\ninput_player1_turbo_axis = "nul"\ninput_player1_turbo_btn = "nul"\ninput_player1_turbo_mbtn = "nul"\ninput_player1_up_axis = "nul"\ninput_player1_up_btn = "nul"\ninput_player1_up_mbtn = "nul"\ninput_player1_x_axis = "nul"\ninput_player1_x_btn = "nul"\ninput_player1_x_mbtn = "nul"\ninput_player1_y_axis = "nul"\ninput_player1_y_btn = "nul"\ninput_player1_y_mbtn = "nul"\ninput_poll_type_behavior = "nul"\ninput_recording_toggle = "nul"\ninput_recording_toggle_axis = "nul"\ninput_recording_toggle_btn = "nul"\ninput_recording_toggle_mbtn = "nul"\ninput_reset = "nul"\ninput_reset_axis = "nul"\ninput_reset_btn = "nul"\ninput_reset_mbtn = "nul"\ninput_rewind = "nul"\ninput_rewind_axis = "nul"\ninput_rewind_btn = "nul"\ninput_rewind_mbtn = "nul"\ninput_save_state_axis = "nul"\ninput_save_state_btn = "nul"\ninput_save_state_mbtn = "nul"\ninput_screenshot_axis = "nul"\ninput_screenshot_btn = "nul"\ninput_screenshot_mbtn = "nul"\ninput_send_debug_info = "nul"\ninput_send_debug_info_axis = "nul"\ninput_send_debug_info_btn = "nul"\ninput_send_debug_info_mbtn = "nul"\ninput_shader_next = "nul"\ninput_shader_next_axis = "nul"\ninput_shader_next_btn = "nul"\ninput_shader_next_mbtn = "nul"\ninput_shader_prev = "nul"\ninput_shader_prev_axis = "nul"\ninput_shader_prev_btn = "nul"\ninput_shader_prev_mbtn = "nul"\ninput_state_slot_decrease = "nul"\ninput_state_slot_decrease_axis = "nul"\ninput_state_slot_decrease_btn = "nul"\ninput_state_slot_decrease_mbtn = "nul"\ninput_state_slot_increase = "nul"\ninput_state_slot_increase_axis = "nul"\ninput_state_slot_increase_btn = "nul"\ninput_state_slot_increase_mbtn = "nul"\ninput_streaming_toggle = "nul"\ninput_streaming_toggle_axis = "nul"\ninput_streaming_toggle_btn = "nul"\ninput_streaming_toggle_mbtn = "nul"\ninput_toggle_fast_forward_axis = "nul"\ninput_toggle_fast_forward_btn = "nul"\ninput_toggle_fast_forward_mbtn = "nul"\ninput_toggle_fullscreen = "nul"\ninput_toggle_fullscreen_axis = "nul"\ninput_toggle_fullscreen_btn = "nul"\ninput_toggle_fullscreen_mbtn = "nul"\ninput_toggle_slowmotion_axis = "nul"\ninput_toggle_slowmotion_btn = "nul"\ninput_toggle_slowmotion_mbtn = "nul"\ninput_turbo_default_button = "nul"\ninput_turbo_mode = "nul"\ninput_turbo_period = "nul"\ninput_volume_down = "nul"\ninput_volume_down_axis = "nul"\ninput_volume_down_btn = "nul"\ninput_volume_down_mbtn = "nul"\ninput_volume_up = "nul"\ninput_volume_up_axis = "nul"\ninput_volume_up_btn = "nul"\ninput_volume_up_mbtn = "nul"\n';
var extraConfig = 'rgui_show_start_screen = "false"\nnotification_show_remap_load = "false"\nmenu_mouse_enable = "true"\nmenu_pointer_enable = "true"\n';
var pdKeys = [8, 9, 13, 19, 27, 32, 33, 34, 35, 36, 42, 44, 45, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135];
var webretroVersion = 6.5;
var maxConsoleLength = 10000;
var updateNotice = document.getElementById("updatenotice");
var versionIndicator = document.getElementById("versionindicator");
var webretroTitle = document.getElementById("webretrotitle");
var upload = document.getElementById("upload");
var googleDriveUpload = document.getElementById("googledriveupload");
var dropboxUpload = document.getElementById("dropboxupload");
var oneDriveUpload = document.getElementById("onedriveupload");
var startButton = document.getElementById("startbutton");
var smooth = document.getElementById("smooth");
var canvas = document.getElementById("canvas");
var canvasMask = document.getElementById("canvasmask");
var saveState = document.getElementById("savestate");
var loadState = document.getElementById("loadstate");
var undoSaveState = document.getElementById("undosavestate");
var undoLoadState = document.getElementById("undoloadstate");
var exportState = document.getElementById("exportstate");
var importState = document.getElementById("importstate");
var ffd = document.getElementById("ffd");
var ffdContent = document.getElementById("ffdcontent");
var coreSelectArea = document.getElementById("coreselectarea");
var uploadArea = document.getElementById("uploadarea");
var coreOrder = document.getElementById("coreorder");
var coreList = document.getElementById("corelist");
var systemName = document.getElementById("systemname");
var consoleButton = document.getElementById("consolebutton");
var resetButton = document.getElementById("resetbutton");
var resetButton2 = document.getElementById("resetbutton2");
var mouseGrabButton = document.getElementById("mousegrabbutton");
var gameFocusButton = document.getElementById("gamefocusbutton");
var fullscreenButton = document.getElementById("fullscreenbutton");
var downloadStandaloneButton = document.getElementById("downloadstandalonebutton");
var menuButton = document.getElementById("menubutton");
var pauseButton = document.getElementById("pause");
var resumeOverlay = document.getElementById("resume");
var sideAlertHolder = document.getElementById("sidealertholder");
var saveGame = document.getElementById("savegame");
var exportSave = document.getElementById("exportsave");
var importSave = document.getElementById("importsave");
var autosave = document.getElementById("autosave");
var mainArea = document.getElementById("mainarea");
var menuBar = document.getElementById("menubar");
var menuHider = document.getElementById("menuhider");
var menuHeight = 45;
var actualMenuHeight = menuHeight;
var canvasCssWorkaroundElement = document.createElement("style");
var themeSelector = document.getElementById("themeselector");
var themes = {"iodinelight": {menuHeight: 45, id: ""}, "iodinedark": {menuHeight: 45, id: "iodinedark"}, "webplayer": {menuHeight: 65, id: "webplayer"}, "webplayernavy": {menuHeight: 65, id: "webplayer navy"}};
var defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "iodinedark" : "iodinelight";
var loadingDiv = document.getElementById("loadingdiv");
var loadingText = document.getElementById("loadingtext");
var loadingBar = document.getElementById("loadingbar");
var takeScreenshot = document.getElementById("takescreenshot");
var modals = document.getElementById("modals");
var keybindTable = document.getElementById("keybindtable");
var saveKeybinds = document.getElementById("savekeybinds");
var resetKeybinds = document.getElementById("resetkeybinds");
var keybindsButton = document.getElementById("keybindsbutton");
var screenshotsButton = document.getElementById("screenshotsbutton");
var savesButton = document.getElementById("savesbutton");
var statesButton = document.getElementById("statesbutton");
var downloadAllScreenshots = document.getElementById("downloadallscreenshots");
var screenshotsDiv = document.getElementById("screenshotsdiv");
var saveTable = document.getElementById("savetable");
var romSelectorTable = document.getElementById("romselectortable");
var pso = document.getElementById("pso");
var coreOptions = {"a5200": {"lowpass": 'a5200_low_pass_filter = "enabled"\n'}, "mednafen_psx": {"highres": 'beetle_psx_internal_resolution = "2x"\n', "ditherscaling": 'beetle_psx_dither_mode = "internal resolution"\n', "widescreen": 'beetle_psx_widescreen_hack = "enabled"\n', "antijitter": 'beetle_psx_pgxp_mode = "memory only"\n'}, "mednafen_psx_hw": {"softwarerenderer": 'beetle_psx_hw_renderer = "software"\n', "highres": 'beetle_psx_hw_internal_resolution = "2x"\n', "ditherscaling": 'beetle_psx_hw_dither_mode = "internal resolution"\n', "widescreen": 'beetle_psx_hw_widescreen_hack = "enabled"\n', "antijitter": 'beetle_psx_hw_pgxp_mode = "memory only"\n'}, "mednafen_vb": {"anaglyph": 'vb_anaglyph_preset = "red & blue"\n'}, "mednafen_wswan": {"75hz": 'wswan_60hz_mode = "disabled"\n', "portrait": 'wswan_rotate_display = "portrait"\n', "lowpass": 'wswan_sound_low_pass = "enabled"\n'}, "melonds": {"leftright": 'melonds_screen_layout = "Left/Right"\n'}, "mgba": {"lowpass": 'mgba_audio_low_pass_filter = "enabled"\n'}, "mupen64plus_next": {"highres": 'mupen64plus-169screensize = "1280x720"\nmupen64plus-43screensize = "960x720"\n', "widescreen": 'mupen64plus-aspect = "16:9 adjusted"\n'}, "o2em": {"lowpass": 'o2em_low_pass_filter = "enabled"\n'}, "parallel_n64": {"highres": 'parallel-n64-screensize = "960x720"\n', "renderer2": 'parallel-n64-gfxplugin = "gln64"\n'}, "prosystem": {"lowpass": 'prosystem_low_pass_filter = "enabled"\n'}, "snes9x": {"mouse": 'input_libretro_device_p1 = "2"\n'}, "stella2014": {"lowpass": 'stella2014_low_pass_filter = "enabled"\n'}, "vecx": {"softwarerenderer": 'vecx_use_hw = "Software"\n'}, "virtualjaguar": {"fastblitter": 'virtualjaguar_usefastblitter = "enabled"\n'}, "yabause": {"frameskip": 'yabause_frameskip = "enabled"\n'}};
var managers = {};
managers.keybind = document.getElementById("keybindmanager");
managers.screenshot = document.getElementById("screenshotmanager");
managers.save = document.getElementById("savemanager");
managers.romSelector = document.getElementById("romselector");
var managerNames = {"save": "Saves & States", "romSelector": "Select the master ROM or playlist"};
var managerTitle = document.getElementById("managertitle");
var managerClose = document.getElementById("managerclose");
var screenshotDatas = [];
var screenshotObjUrls = [];
var saveIDs = [];
var quotaText = document.getElementById("quotatext");
var recommendedExtensions = document.getElementById("recommendedextensions");
var systems = {"81": "ZX81", "dosbox": "MS-DOS", "dosbox_pure": "MS-DOS", "opera": "3DO", "fsuae": "Amiga", "puae": "Amiga", "cap32": "Amstrad CPC", "fbalpha2012": "Arcade", "fbneo": "Arcade", "mame2003_plus": "Arcade", "stella": "Atari 2600", "stella2014": "Atari 2600", "atari800": "Atari 5200", "a5200": "Atari 5200", "prosystem": "Atari 7800", "virtualjaguar": "Atari Jaguar", "handy": "Atari Lynx", "mednafen_lynx": "Atari Lynx", "hatari": "Atari ST/TT", "gearcoleco": "ColecoVision", "vice_x64": "Commodore 64", "bk": "Electronika BK", "freechaf": "Fairchild Channel F", "gw": "Game & Watch", "vba_next": "GBA", "vbam": "GBA", "meteor": "GBA", "mednafen_gba": "GBA", "gpsp": "GBA", "mgba": "GB/GBC/GBA", "gambatte": "GB/GBC", "gearboy": "GB/GBC", "tgbdual": "GB/GBC", "sameboy": "GB/GBC", "o2em": "Odyssey 2", "freeintv": "Intellivision", "fmsx": "MSX", "bluemsx": "MSX", "neocd": "Neo-Geo CD", "mednafen_ngp": "Neo-Geo Pocket", "bnes": "NES", "fceumm": "NES", "quicknes": "NES", "mesen": "NES", "nestopia": "NES", "citra": "Nintendo 3DS", "mupen64plus_next": "Nintendo 64", "parallel_n64": "Nintendo 64", "desmume2015": "Nintendo DS", "desmume": "Nintendo DS", "melonds": "Nintendo DS", "dolphin": "Nintendo GC/Wii", "mednafen_pce_fast": "PC Engine", "mednafen_supergrafx": "PC Engine SuperGrafx", "quasi88": "PC-8000/8800", "np2kai": "PC-98", "mednafen_pcfx": "PC-FX", "mednafen_psx": "PlayStation", "mednafen_psx_hw": "PlayStation", "pcsx2": "PlayStation 2", "ppsspp": "PSP", "scummvm": "ScummVM", "flycast": "Sega Dreamcast", "mednafen_saturn": "Sega Saturn", "mednafen_saturn_hw": "Sega Saturn", "yabause": "Sega Saturn", "yabasanshiro": "Sega Saturn", "kronos": "Sega Saturn", "picodrive": "Sega Systems", "genesis_plus_gx": "Sega Systems", "blastem": "Sega Genesis", "px68k": "Sharp X68000", "fuse": "ZX Spectrum", "bsnes": "SNES", "bsnes_mercury_performance": "SNES", "bsnes_mercury_balanced": "SNES", "bsnes_mercury_accuracy": "SNES", "mednafen_snes": "SNES", "mesen-s": "SNES", "snes9x": "SNES", "theodore": "Thomson MO/TO", "vecx": "Vectrex", "mednafen_vb": "Virtual Boy", "mednafen_wswan": "WonderSwan"};
var coreNames = {"81": "EightyOne", "dosbox": "DOSBox", "dosbox_pure": "DOSBox Pure", "opera": "Opera", "fsuae": "FS-UAE", "puae": "PUAE", "cap32": "Caprice32", "fbalpha2012": "FB Alpha 2012", "fbneo": "FB Neo", "mame2003_plus": "MAME 2003 Plus", "stella": "Stella", "stella2014": "Stella 2014", "atari800": "Atari800", "a5200": "a5200", "prosystem": "ProSystem", "virtualjaguar": "Virtual Jaguar", "handy": "Handy", "mednafen_lynx": "Beetle Lynx", "hatari": "Hatari", "gearcoleco": "Gearcoleco", "vice_x64": "VICE", "bk": "BK", "freechaf": "FreeChaF", "gw": "GW", "vba_next": "VBA-Next", "vbam": "VBA-M", "meteor": "Meteor", "mednafen_gba": "Beetle GBA", "gpsp": "gpSP", "mgba": "mGBA", "gambatte": "Gambatte", "gearboy": "Gearboy", "tgbdual": "TGB Dual", "sameboy": "SameBoy", "o2em": "O2EM", "freeintv": "FreeIntv", "fmsx": "fMSX", "bluemsx": "blueMSX", "neocd": "NeoCD", "mednafen_ngp": "Beetle NeoPop", "bnes": "bnes", "fceumm": "FCEUmm", "quicknes": "QuickNES", "mesen": "Mesen", "nestopia": "Nestopia UE", "citra": "Citra", "mupen64plus_next": "Mupen64Plus-Next", "parallel_n64": "ParaLLEl N64", "desmume2015": "DeSmuME 2015", "desmume": "DeSmuME", "melonds": "melonDS", "dolphin": "Dolphin", "mednafen_pce_fast": "Beetle PCE Fast", "mednafen_supergrafx": "Beetle SuperGrafx", "quasi88": "QUASI88", "np2kai": "NP2kai", "mednafen_pcfx": "Beetle PCFX", "mednafen_psx": "Beetle PSX", "mednafen_psx_hw": "Beetle PSX HW", "pcsx2": "PCSX2", "ppsspp": "PPSSPP", "scummvm": "ScummVM", "flycast": "Flycast", "mednafen_saturn": "Beetle Saturn", "mednafen_saturn_hw": "Beetle Saturn HW", "yabause": "Yabause", "yabasanshiro": "YabaSanshiro", "kronos": "Kronos", "picodrive": "PicoDrive", "genesis_plus_gx": "Genesis Plus GX", "blastem": "BlastEm", "px68k": "px68k", "fuse": "Fuse", "bsnes": "bsnes", "bsnes_mercury_performance": "bsnes-mercury Performance", "bsnes_mercury_balanced": "bsnes-mercury Balanced", "bsnes_mercury_accuracy": "bsnes-mercury Accuracy", "mednafen_snes": "Beetle SNES", "mesen-s": "Mesen-S", "snes9x": "Snes9x", "theodore": "Theodore", "vecx": "Vecx", "mednafen_vb": "Beetle VB", "mednafen_wswan": "Beetle WonderSwan"};
var fileExts = {"3DO": "", "Amiga": ".adf, .adz, .dms, .ipf, .hdf, .hdz", "Amstrad CPC": ".dsk, .sna, .cdt, .voc, .cpr", "Arcade": "", "Atari 2600": ".a26", "Atari 5200": ".a52", "Atari 7800": ".a78", "Atari Jaguar": ".j64, .jag, .abs, .cof, .prg", "Atari Lynx": ".lnx", "Atari ST/TT": ".st, .stx, .msa", "ColecoVision": ".col, .cv", "Commodore 64": ".d64, .d6z, .d71, .d7z, .d80, .d81, .d82, .d8z, .g64, .g6z, .g41, .g4z, .x64, .x6z, .nib, .nbz, .d2m, .d4m, .t64, .p00", "Electronika BK": "", "Fairchild Channel F": ".chf", "GB/GBC/GBA": ".gb, .gbc, .gba", "GBA": ".gba", "Game & Watch": ".mgw", "GB/GBC": ".gb, .gbc", "Intellivision": ".int", "MS-DOS": ".exe", "MSX": ".mx1, .mx2, .dsk, .cas", "NES": ".nes, .fds, .unf, .unif", "Neo-Geo CD": "", "Neo-Geo Pocket": ".ngp, .ngc", "Nintendo 3DS": ".3ds, .3dsx, .cci, .cxi", "Nintendo 64": ".n64, .v64, .z64, .u1, .ndd", "Nintendo DS": ".nds, .srl", "Nintendo GC/Wii": ".gcm, .dol, .tgc, .wbfs, .gcz, .wad", "Odyssey 2": "", "PC Engine SuperGrafx": ".sgx", "PC Engine": ".pce", "PC-8000/8800": ".d88, .88d, .u88, .88u", "PC-98": ".d98, .98d, .fdi, .fdd, .tfd, .hdm, .hdi", "PC-FX": "", "PSP": ".pbp", "PlayStation 2": "", "PlayStation": "", "SNES": ".smc, .sfc, .swc, .fig, .bs", "ScummVM": ".exe", "Sega Dreamcast": ".cdi, .gdi, .lst", "Sega Systems": ".mdx, .md, .smd, .gen, .sms, .gg, .sg, .68k, .sgd", "Sega Genesis": ".mdx, .md, .smd, .gen, .sms, .68k, .sgd", "Sega Saturn": "", "Sharp X68000": ".dim, .dup, .2hd, .xdf, .hdf", "ZX Spectrum": ".tzx, .tap, .z80, .rzx, .scl", "ZX81": ".p, .t81", "Thomson MO/TO": ".fd, .sap, .k7, .m7, .m5", "Vectrex": ".vec", "Virtual Boy": ".vb, .vboy", "WonderSwan": ".ws, .wsc, .pc2"};
var multiFileCores = ["dosbox", "dosbox_pure", "opera", "fsuae", "puae", "cap32", "fbalpha2012", "fbneo", "mame2003_plus", "vice_x64", "neocd", "mednafen_supergrafx", "mednafen_pce_fast", "quasi88", "mednafen_pcfx", "mednafen_psx", "mednafen_psx_hw", "scummvm", "flycast", "mednafen_saturn", "mednafen_saturn_hw", "yabause", "yabasanshiro", "kronos", "px68k"];
var exclusiveMultiFileCores = ["dosbox", "dosbox_pure", "fbalpha2012", "fbneo", "mame2003_plus", "scummvm"]; // used for arcade systems, etc
var playlistExts = ".m3u, .cue, .ccd";
var playlistCores = ["opera", "fsuae", "puae", "cap32", "vice_x64", "neocd", "mednafen_supergrafx", "mednafen_pce_fast", "quasi88", "mednafen_pcfx", "mednafen_psx", "mednafen_psx_hw", "flycast", "mednafen_saturn", "mednafen_saturn_hw", "yabause", "yabasanshiro", "kronos", "px68k"]; // all of these must also be in multiFileCores
var cdromExts = ".iso, .img, .ciso, .cso, .chd";
var cdromCores = ["opera", "fsuae", "puae", "neocd", "dolphin", "mednafen_supergrafx", "mednafen_pce_fast", "ppsspp", "pcsx2", "mednafen_psx", "mednafen_psx_hw", "mednafen_saturn", "mednafen_saturn_hw", "yabause", "yabasanshiro", "kronos"]; // probably put these in playlistCores too
var multiSaveCores = ["pcsx2", "mednafen_psx", "mednafen_psx_hw", "scummvm", "flycast", "mednafen_saturn", "mednafen_saturn_hw"];
var noSaveCores = ["81", "dosbox", "dosbox_pure", "stella", "stella2014", "atari800", "a5200", "prosystem", "handy", "mednafen_lynx", "hatari", "bk", "freechaf", "gw", "freeintv", "bluemsx", "fmsx", "o2em", "np2kai", "px68k", "fuse"];
var noStateCores = ["dosbox", "atari800", "virtualjaguar", "hatari", "bk", "gw", "bluemsx", "pcsx2", "scummvm", "px68k"];
var preferredCores = ["opera", "puae", "cap32", "fbneo", "stella2014", "a5200", "prosystem", "virtualjaguar", "handy", "hatari", "gearcoleco", "vice_x64", "bk", "freechaf", "mgba", "vba_next", "gw", "sameboy", "freeintv", "dosbox_pure", "fmsx", "nestopia", "neocd", "mednafen_ngp", "citra", "mupen64plus_next", "melonds", "dolphin", "o2em", "mednafen_pce_fast", "mednafen_supergrafx", "np2kai", "quasi88", "mednafen_pcfx", "ppsspp", "mednafen_psx_hw", "pcsx2", "snes9x", "scummvm", "flycast", "blastem", "kronos", "genesis_plus_gx", "px68k", "81", "fuse", "theodore", "vecx", "mednafen_vb", "mednafen_wswan"];
var allCores = Object.keys(systems);
var allSystems = Object.keys(fileExts);
var allFileExts = Array.from(new Set(Object.values(fileExts).filter(i => i).join(", ").split(", "))).join(", ");
var systemsExperimentalFormat = Object.fromEntries(Object.values(systems).map(i => [i, allCores.filter(j => systems[j] == i)]));
var installedCores = ["a5200", "freechaf", "freeintv", "gearcoleco", "genesis_plus_gx", "handy", "mednafen_ngp", "mednafen_psx_hw", "mednafen_vb", "mednafen_wswan", "melonds", "mgba", "mupen64plus_next", "neocd", "nestopia", "o2em", "opera", "parallel_n64", "prosystem", "snes9x", "stella2014", "vecx", "virtualjaguar", "yabause"];
var installedSystems = allSystems.filter(i => installedCores.some(j => allCores.filter(k => systems[k] == i).includes(j)));
var installedFileExts = installedSystems.map(i => fileExts[i]).filter(i => i).join(", ");
var coreGithub = document.getElementById("coregithub");
var coreGithubLinks = {"81": "libretro/81-libretro", "dosbox": "libretro/dosbox-libretro", "dosbox_pure": "schellingb/dosbox-pure", "opera": "libretro/opera-libretro", "fsuae": "libretro/libretro-fsuae", "puae": "libretro/libretro-uae", "cap32": "libretro/libretro-cap32", "fbalpha2012": "libretro/fbalpha2012", "fbneo": "libretro/FBNeo", "mame2003_plus": "libretro/mame2003-plus-libretro", "stella": "stella-emu/stella", "stella2014": "libretro/stella2014-libretro", "atari800": "libretro/libretro-atari800", "a5200": "libretro/a5200", "prosystem": "libretro/prosystem-libretro", "virtualjaguar": "libretro/virtualjaguar-libretro", "handy": "libretro/libretro-handy", "mednafen_lynx": "libretro/beetle-lynx-libretro", "hatari": "libretro/hatari", "gearcoleco": "drhelius/Gearcoleco", "vice_x64": "libretro/vice-libretro", "bk": "libretro/bk-emulator", "freechaf": "libretro/FreeChaF", "gw": "libretro/gw-libretro", "vba_next": "libretro/vba-next", "vbam": "libretro/vbam-libretro", "meteor": "libretro/meteor-libretro", "mednafen_gba": "libretro/beetle-gba-libretro", "gpsp": "libretro/gpsp", "mgba": "libretro/mgba", "gambatte": "libretro/gambatte-libretro", "gearboy": "drhelius/Gearboy", "tgbdual": "libretro/tgbdual-libretro", "sameboy": "libretro/SameBoy", "o2em": "libretro/libretro-o2em", "freeintv": "libretro/FreeIntv", "fmsx": "libretro/fmsx-libretro", "bluemsx": "libretro/blueMSX-libretro", "neocd": "libretro/neocd_libretro", "mednafen_ngp": "libretro/beetle-ngp-libretro", "bnes": "libretro/bnes-libretro", "fceumm": "libretro/libretro-fceumm", "quicknes": "libretro/QuickNES_Core", "mesen": "libretro/Mesen", "nestopia": "libretro/nestopia", "citra": "libretro/citra", "mupen64plus_next": "libretro/mupen64plus-libretro-nx", "parallel_n64": "libretro/parallel-n64", "desmume2015": "libretro/desmume2015", "desmume": "libretro/desmume", "melonds": "libretro/melonds", "dolphin": "libretro/dolphin", "mednafen_pce_fast": "libretro/beetle-pce-fast-libretro", "mednafen_supergrafx": "libretro/beetle-supergrafx-libretro", "quasi88": "libretro/quasi88-libretro", "np2kai": "AZO234/NP2kai", "mednafen_pcfx": "libretro/beetle-pcfx-libretro", "mednafen_psx": "libretro/beetle-psx-libretro", "mednafen_psx_hw": "libretro/beetle-psx-libretro", "pcsx2": "libretro/pcsx2", "ppsspp": "hrydgard/ppsspp", "scummvm": "libretro/scummvm", "flycast": "flyinghead/flycast", "mednafen_saturn": "libretro/beetle-saturn-libretro", "mednafen_saturn_hw": "libretro/beetle-saturn-libretro", "yabause": "libretro/yabause", "yabasanshiro": "libretro/yabause/tree/yabasanshiro", "kronos": "libretro/yabause/tree/kronos", "picodrive": "libretro/picodrive", "genesis_plus_gx": "libretro/Genesis-Plus-GX", "blastem": "libretro/blastem", "px68k": "libretro/px68k-libretro", "fuse": "libretro/fuse-libretro", "bsnes": "libretro/bsnes-libretro", "bsnes_mercury_performance": "libretro/bsnes-mercury", "bsnes_mercury_balanced": "libretro/bsnes-mercury", "bsnes_mercury_accuracy": "libretro/bsnes-mercury", "mednafen_snes": "libretro/beetle-bsnes-libretro", "mesen-s": "libretro/Mesen-S", "snes9x": "libretro/snes9x", "theodore": "Zlika/theodore", "vecx": "libretro/libretro-vecx", "mednafen_vb": "libretro/beetle-vb-libretro", "mednafen_wswan": "libretro/beetle-wswan-libretro"};
var baseFsBundleDir = "/home/web_user/retroarch/bundle";
var baseFsSystemDir = "/home/web_user/retroarch/userdata/system/";
var baseFsConfigDir = "/home/web_user/retroarch/userdata/config/";
var baseFsSaveDir = "/home/web_user/retroarch/userdata/saves/";
var FSTracking = new EventTarget();
var writeToFileCooldown = {};
var saveObj = {};
var bundleErrors = 0;
var sramExts = ".srm, .sram, .ram, .gam, .sav, .dsv, .nvr, .SNA, .mcr";
var smasBrickFix = {"16a160ddd431a3db6fcd7453ffae9c4c": [80,65,84,67,72,0,127,160,0,8,169,1,133,160,141,0,22,107,1,191,182,0,4,34,160,255,0,6,189,164,0,4,34,160,255,0,69,79,70], "e87d43969bdf563d1148e3b35e8b5360": [80,65,84,67,72,0,129,160,0,8,169,1,133,160,141,0,22,107,1,193,182,0,4,34,160,255,0,6,191,164,0,4,34,160,255,0,69,79,70], "2071b049a463cefd7a0b7aeab8037ca0": [80,65,84,67,72,0,127,160,0,8,169,1,133,160,141,0,22,107,1,191,190,0,4,34,160,255,0,6,189,164,0,4,34,160,255,0,69,79,70]}; // Couldn't find SMAS+W SMC ROM [80,65,84,67,72,0,129,160,0,8,169,1,133,160,141,0,22,107,1,193,190,0,4,34,160,255,0,6,191,164,0,4,34,160,255,0,69,79,70]
// disable webcam for gameboy camera
var disableWebCam = true;
var appIsPwa = window.matchMedia("(display-mode: standalone)").matches;
// https://stackoverflow.com/a/11381730
var appIsPhone = false;
var appIsTouchscreen = false;
try {
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) appIsPhone = true;})(navigator.userAgent||navigator.vendor||window.opera);
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) appIsTouchscreen = true;})(navigator.userAgent||navigator.vendor||window.opera);
} catch (e) {
	console.warn(e);
}

// query string into object
var queries = Object.fromEntries(window.location.search.substring(1).split("&").map(i => i.split("=")).map(i => i.map(i => i && decodeURIComponent(i))));

// core lists
function sortArray(array, sortTo) {
	var orig = array.map(i => sortTo[i].toLowerCase());
	var sorted = orig.map(i => i).sort();
	var reSort = [];
	var prev = -1;
	var findex = -1;
	for (var i = 0; i < sorted.length; i++) {
		var curr = orig.indexOf(sorted[i]);
		if (curr == findex) { // hit, find the next one
			curr = orig.indexOf(sorted[i], prev + 1);
		} else { // miss, set new findex
			findex = curr;
		}
		prev = curr;
		reSort.push(array[curr]);
	}
	return reSort;
}

function updateCoreList() {
	var coreArr;
	switch (coreOrder.selectedIndex) {
		case 0:
			coreArr = sortArray(installedCores, systems);
			break;
		case 1:
			coreArr = sortArray(installedCores, coreNames);
			break;
		case 2:
			coreArr = installedCores;
			break;
		default:
			coreArr = installedCores;
			break;
	}
	
	var aCoreList = "";
	for (var i = 0; i < coreArr.length; i++) {
		aCoreList += '<li><a href="?core=' + coreArr[i] + '">' + (coreNames[coreArr[i]] || coreArr[i]) + ' (' + systems[coreArr[i]] + ')</a></li>';
	}
	coreList.innerHTML = aCoreList;
}

function showCoreList() {
	updateCoreList();
	document.body.classList.add("coreselect");
	coreSelectArea.style.display = "block";
	uploadArea.style.display = "none";
	ffd.style.display = "block";
}

coreOrder.onchange = function() {
	updateCoreList();
}

// back-forward cache fix. this was the only way that I found to do this. ULTRA STUPID!!!!!
window.addEventListener("load", function() {
	window.setTimeout(function() {
		updateCoreList();
	}, 0);
}, false);

// Binary to UTF-8
function u8atoutf8(data) {
	return new TextDecoder().decode(data);
}

function avShift(array, shift) {
	for (var i = 0; i < array.length; i++) {
		array[i] += shift;
	}
	return array;
}

// date time
function getTime() {
	var dateTime = new Date();
	return dateTime.getFullYear().toString()+"-"+(dateTime.getMonth()+1).toString()+"-"+dateTime.getDate().toString()+"-"+dateTime.getHours().toString()+"-"+dateTime.getMinutes().toString();
}

// bytes to human-readable string
function bytesToHumanReadable(bytes, si) {
	bytes = bytes || 0;
	var extension = -1;
	while (bytes >= 1000) {
		bytes /= si ? 1000 : 1024;
		extension++;
	}
	return extension >= 8 ? "overflow" : bytes.toFixed(2) + " " + "KMGTPEZY".charAt(extension) + (!si && (extension > -1) ? "i" : "") + "B";
}

// js has no built-in capitalization function
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// key press stuff
function fakeKey(type, info) {
	var e = new KeyboardEvent(type, {code: info.code || undefined, key: info.key || undefined, shiftKey: info.shiftKey || undefined});
	document.dispatchEvent(e);
}

function fakeKeyPress(info) {
	fakeKey("keydown", info);
	window.setTimeout(function() {
		fakeKey("keyup", info);
	}, 50);
}

function fakeCharPress(key) {
	if (charToCodeMap.hasOwnProperty(key)) fakeKeyPress({code: charToCodeMap[key].code, key: charToKeyMap.hasOwnProperty(key) ? charToKeyMap[key].key : key, shiftKey: charToCodeMap[key].hasOwnProperty("shift") ? true : false});
}

function sendText(text) {
	for (var i = 0; i < text.length; i++) {
		fakeCharPress(text.charAt(i));
	}
}

function configIDToCode(configid) {
	return Object.keys(codeToConfigIDMap).find(k => codeToConfigIDMap[k] == configid);
}

function isAudioAllowed() {
	try {
		var audio = new AudioContext();
		var state = audio.state;
		audio.close();
		return (state == "running");
	} catch (e) {
		return false;
	}
}

// indexedDB
function setIdbItem(key, value, customTransaction) {
	(customTransaction || wIdb.transaction("main", "readwrite")).objectStore("main").put({key: key, value: value});
}

function getIdbItem(key, customTransaction) {
	return new Promise(function(resolve) {
		(customTransaction || wIdb.transaction("main", "readwrite")).objectStore("main").get(key).onsuccess = function(e) {
			resolve(e.target.result ? e.target.result.value : null);
		}
	});
}

function getAllIdbItems(customTransaction) {
	return new Promise(function(resolve) {
		(customTransaction || wIdb.transaction("main", "readwrite")).objectStore("main").getAll().onsuccess = function(e) {
			resolve(e.target.result ? e.target.result : null);
		}
	});
}

function removeIdbItem(key, customTransaction) {
	(customTransaction || wIdb.transaction("main", "readwrite")).objectStore("main").delete(key);
}

function openIdb() {
	var request = indexedDB.open("webretro", 2);
	request.onsuccess = function(e) {
		wIdb = e.target.result;
	}
	request.onupgradeneeded = function(e) {
		wIdb = e.target.result;
		var transaction = e.target.transaction;
		
		switch (e.oldVersion) {
			case 0:
				// create the object store
				wIdb.createObjectStore("main", {keyPath: "key"}).transaction.oncomplete = function() {
					// look for saves in localStorage from old versions
					var ls = Object.keys(localStorage);
					for (var i = 0; i < ls.length; i++) {
						if (ls[i].startsWith("RetroArch_saves_")) {
							setIdbItem(ls[i], [{ext: ".srm", dir: "", data: new Uint8Array(JSON.parse(localStorage.getItem(ls[i])))}], transaction);
							localStorage.removeItem(ls[i]);
						}
					}
				}
				break;
			case 1:
				// move the saves into arrays
				(async function() {
					var allItems = await getAllIdbItems(transaction);
					for (var i = 0; i < allItems.length; i++) {
						if (allItems[i].key.startsWith("RetroArch_saves_")) {
							setIdbItem(allItems[i].key, [{ext: ".srm", dir: "", data: allItems[i].value}], transaction);
						}
					}
				})();
				break;
		}
	}
}

openIdb();

// side alerts
function sideAlert(initialText, time) {
	var p = document.createElement("p");
	p.className = "sidealert";
	p.appendChild(document.createTextNode(initialText));
	sideAlertHolder.appendChild(p);
	window.setTimeout(function() {
		p.classList.add("on");
	}, 10);
	this.dismiss = function() {
		p.classList.remove("on");
		window.setTimeout(function() {
			p.remove();
		}, 100);
	}
	this.setText = function(text) {
		p.textContent = text;
	}
	if (time) window.setTimeout(this.dismiss, time);
}

// change background for status messages
function setStatus(message) {
	loadStatus = message;
	loadingText.textContent = message;
}

// remove status messages
function removeStatus(message) {
	if (loadStatus == message) setStatus("");
}

// adjust canvas size to window
function adjustCanvasSize() {
	var dpi = window.devicePixelRatio || 1;
	var width = window.innerWidth * dpi;
	var height = (window.innerHeight * dpi) - (actualMenuHeight * dpi);
	if (Module && Module.setCanvasSize) {
		Module.setCanvasSize(width, height);
	} else {
		canvas.width = width;
		canvas.height = height;
	}
}
window.addEventListener("resize", adjustCanvasSize, false);
adjustCanvasSize();

// emscripten is stupid and removes css width and height properties from the canvas - https://github.com/emscripten-core/emscripten/issues/6353
function canvasCssWorkaround(css) {
	canvasCssWorkaroundElement.textContent = "#canvas { " + css + " }";
	document.head.appendChild(canvasCssWorkaroundElement);
}

// adjust the menu bar height
function adjustActualMenuHeight() {
	canvasCssWorkaround("top: " + actualMenuHeight + "px; height: calc(100vh - " + actualMenuHeight + "px);");
	canvasMask.style.top = "" + actualMenuHeight + "px";
	canvasMask.style.height = "calc(100vh - " + actualMenuHeight + "px)";
	
	menuBar.style.height = "" + actualMenuHeight + "px";
	
	adjustCanvasSize();
}

// menu hider
function adjustMenuHeight() {
	if (menuHider.checked) {
		actualMenuHeight = 0;
		adjustActualMenuHeight();
	} else {
		actualMenuHeight = menuHeight;
		adjustActualMenuHeight();
	}
}
menuHider.onchange = adjustMenuHeight;

// logging
function log(log, userInput) {
	console.log(log);
	if (maxConsoleLength > 0 && wconsole.textContent.length > maxConsoleLength) wconsole.textContent = wconsole.textContent.substring(wconsole.textContent.indexOf("\n") + 1);
	wconsole.textContent += (userInput ? "> " + userInput + "\n\t" + JSON.stringify(log) : log) + "\n";
	wconsole.scrollTo({top: wconsole.scrollHeight});
}

// xhr
function grab(url, type, success, fail) {
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.overrideMimeType("text/plain; charset=x-user-defined");
	req.responseType = type;
	req.timeout = 8000;
	req.onload = function() {
		if (req.status >= 400) {
			if (fail) fail(req.status);
		} else {
			if (success) success(this.response);
		}
	}
	req.onerror = function() {
		if (fail) fail(0);
	}
	req.ontimeout = function() {
		if (fail) fail(0);
	}
	req.send();
}

// file readers
function readFile(file) {
	return new Promise(function(resolve) {
		var reader = new FileReader();
		reader.onload = function() {
			resolve(this.result);
		}
		reader.readAsArrayBuffer(file);
	});
}

function downloadFile(data, name, mime) {
	var a = document.createElement("a");
	a.download = name;
	a.href = URL.createObjectURL(new Blob([data], {type: mime || "application/octet-stream"}));
	a.click();
	window.setTimeout(function() {
		URL.revokeObjectURL(a.href);
	}, 2000);
}

function uploadFile(accept, callback) {
	var input = document.createElement("input");
	input.type = "file";
	input.accept = accept;
	input.onchange = async function() {
		var file = this.files[0];
		var data = await readFile(file);
		callback({name: file.name, data: data});
	}
	input.click();
}

function uploadFileMulti(accept, callback) {
	let directoryUpload = confirm("Upload a directory?");
	
	var input = document.createElement("input");
	input.type = "file";
	if (directoryUpload) {
		input.setAttribute("directory", "");
		input.setAttribute("webkitDirectory", "");
	} else {
		input.setAttribute("multiple", "");
		input.accept = accept;
	}
	input.onchange = async function() {
		let datas = [];
		for (var i = 0; i < this.files.length; i++) {
			var name = directoryUpload ? (this.files[i].relativePath || this.files[i].webkitRelativePath || "").split("/").slice(1).join("/") : this.files[i].name;
			var data = await readFile(this.files[i]);
			datas.push({path: name, data: data});
			if (i == this.files.length - 1 && callback) callback(datas);
		}
	}
	input.click();
}

// scripts
function getScript(url, callback, err) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.onload = function() {
		if (callback) callback();
	}
	script.onerror = function(e) {
		document.body.removeChild(script);
		if (err) err(e);
	}
	document.body.appendChild(script);
}

function getCore(name, callback, err) {
	getScript(relativeBase + coreDir + name + "_libretro.js", callback, err);
}

// check for updates
function checkForUpdates() {
	grab(infoJsonUrl, "text", function(text) {
		try {
			var updateObj = JSON.parse(text);
			if (updateObj.webretro) {
				latestVersion = updateObj.webretro;
				if (updateObj.versions[webretroVersion.toString()]) versionIndicator.title = "New features in this version:\n\n- " + updateObj.versions[webretroVersion.toString()].changeList.join("\n- ");
				if (latestVersion > webretroVersion && updateObj.versions[latestVersion.toString()]) {
					updateNotice.textContent = "New webretro version available: v" + latestVersion.toString() + ". Features:\n\n- " + updateObj.versions[latestVersion.toString()].changeList.join("\n- ") + "\n\nThe site owner(s) can apply the update.";
					updateNotice.style.display = "initial";
				}
			}
		} catch (e) {
			console.warn(e);
		}
	});
}

// download standalone webretro
function downloadStandaloneWebretro() {
	grab(standaloneDownloadUrl, "text", function(data) {
		alert("Downloading standalone webretro. Internet is required for operation.");
		downloadFile(data, standaloneDownloadUrl.split("/").slice(-1)[0], "text/html");
	}, function() {
		alert("Failed to fetch file.");
	});
}

downloadStandaloneButton.onclick = downloadStandaloneWebretro;

function getFileExtsForCore(core) {
	return [fileExts[systems[core]], (cdromCores.includes(core) ? cdromExts : ""), (playlistCores.includes(core) ? playlistExts : "")].filter(i => i).join(", ");
}

// unzip file
function unzipFile(data, exts, callback, empty, notfound) {
	new zip.ZipReader(new zip.Uint8ArrayReader(new Uint8Array(data))).getEntries().then(async function(entries) {
		if (entries.length) {
			for (var i = 0; i < entries.length; i++) {
				if (!entries[i].directory && exts.split(", ").includes("." + u8atoutf8(entries[i].rawFilename).split(".").slice(-1)[0].toLowerCase())) {
					var name = u8atoutf8(entries[i].rawFilename);
					var uzd = await entries[i].getData(new zip.Uint8ArrayWriter());
					callback(name, uzd.buffer);
					break;
				}
				if (i == entries.length - 1 && notfound) notfound();
			}
		} else if (empty) empty();
	});
}

// unzip all files
function unzipFileMulti(data, callback, empty) {
	new zip.ZipReader(new zip.Uint8ArrayReader(new Uint8Array(data))).getEntries().then(async function(entries) {
		if (entries.length) {
			let datas = [];
			for (var i = 0; i < entries.length; i++) {
				if (!entries[i].directory) {
					var name = u8atoutf8(entries[i].rawFilename);
					var uzd = await entries[i].getData(new zip.Uint8ArrayWriter());
					datas.push({path: name, data: uzd.buffer});
					if (i == entries.length - 1 && callback) callback(datas);
				}
			}
		} else if (empty) empty();
	});
}

// zip files
async function zipFiles(files, callback) {
	var u8aWriter = new zip.Uint8ArrayWriter("application/zip");
	var writer = new zip.ZipWriter(u8aWriter);
	for (var i = 0; i < files.length; i++) {
		await writer.add(files[i].path, new zip.Uint8ArrayReader(new Uint8Array(files[i].data)));
	}
	await writer.close();
	var zipped = await u8aWriter.getData();
	callback(zipped.buffer);
}

// file renames
function replaceInFiles(files, find, replace) {
	return files.map(i => ({path: i.path.replace(find, replace), data: i.data}));
}

// uauth uploads
function handleWebFile(data) {
	if (data.message == "success") {
		ffd.style.display = "none";
		romUploadCallback([{path: data.name, data: data.data}]);
	} else if (data.message == "error") {
		alert("There was an error with the file picker. This may mean that you have to allow popup windows.");
	}
}

function uploadWebFile(type, exts) {
	uauth.open(type, exts.split(", "), handleWebFile);
}

// file tree to list, etc (for drag-and-drop files)
function readFileEntry(fileEntry) {
	return new Promise(function(resolve) {
		fileEntry.file(function(file) {
			resolve(file);
		});
	});
}

function readDirectoryEntry(directoryEntry) {
	return new Promise(function(resolve) {
		directoryEntry.createReader().readEntries(function(entries) {
			resolve(entries);
		});
	});
}

async function fileTreeToList(items) {
	let newItems = [];
	for (var i = 0; i < items.length; i++) {
		if (items[i].isFile) {
			newItems.push(items[i]);
		} else if (items[i].isDirectory) {
			var entries = await readDirectoryEntry(items[i]);
			var contents = await fileTreeToList(entries);
			newItems = newItems.concat(contents);
		}
	}
	return newItems;
}

// rom upload
function readyRomUploads(exts) {
	romUploadsReady = true;
	
	// when a rom file is chosen
	upload.onclick = function() {
		if (multiFileCores.includes(core)) {
			uploadFileMulti(exts, function(files) {
				ffd.style.display = "none";
				log("Succesfully read ROM files...");
				romUploadCallback(files);
			});
		} else {
			uploadFile(exts, function(file) {
				ffd.style.display = "none";
				log('Succesfully read ROM file "' + file.name + '"');
				romUploadCallback([{path: file.name, data: file.data}]);
			});
		}
	}
	
	// web uploads
	googleDriveUpload.onclick = function() {
		uploadWebFile("drive", exts);
	}
	dropboxUpload.onclick = function() {
		uploadWebFile("dropbox", exts);
	}
	oneDriveUpload.onclick = function() {
		uploadWebFile("onedrive", exts);
	}
	
	// file drop (we need these to be global so they can be removed later)
	window.fileDragEnter = function(e) {
		if (e.dataTransfer.types.includes("Files")) ffd.classList.add("filehover");
	}
	window.fileDragOver = function(e) {
		e.preventDefault();
	}
	window.fileDropped = async function(e) {
		if (e.dataTransfer.types.includes("Files")) {
			e.preventDefault();
			ffd.style.display = "none";
			
			let fileTree = Array.from(e.dataTransfer.items).map(i => i.webkitGetAsEntry());
			let files = await fileTreeToList(fileTree);
			let datas = [];
			
			for (var i = 0; i < files.length; i++) {
				var file = await readFileEntry(files[i]);
				var name = files[i].fullPath.slice(1);
				var data = await readFile(file);
				datas.push({path: name, data: data});
			}
			
			// extract inside if only 1 directory is dropped
			if (fileTree.length == 1 && fileTree[0].isDirectory) {
				for (var i = 0; i < datas.length; i++) {
					datas[i].path = datas[i].path.split("/").slice(1).join("/");
				}
			}
			
			log("Succesfully read ROM file(s)...");
			romUploadCallback(datas);
		}
	}
	document.addEventListener("dragenter", fileDragEnter, false);
	document.addEventListener("dragover", fileDragOver, false);
	document.addEventListener("drop", fileDropped, false);
}

// chrome 102 launch queue https://developer.chrome.com/blog/new-in-chrome-102/#file-handlers
function readyLaunchQueue() {
	if ("launchQueue" in window && LaunchParams && "files" in LaunchParams.prototype) {
		launchQueue.setConsumer(async function(params) {
			log("Launching with ROM file(s)...");
			ffd.style.display = "none";
			
			let datas = [];
			
			for (var i = 0; i < params.files.length; i++) {
				var file = await params.files[i].getFile();
				var data = await readFile(file);
				datas.push({path: params.files[i].name, data: data});
			}
			
			log("Succesfully read ROM file(s)...");
			romUploadCallback(datas);
		});
	}
}

// rom fetch
function readyRomFetch() {
	var romloc = (/^(https?:)?\/\//i).test(queries.rom) ? queries.rom : relativeBase + "roms/" + queries.rom;
	var romFilename = queries.rom.split("/").slice(-1)[0];
	grab(romloc, "arraybuffer", function(data) {
		log("Succesfully fetched ROM from " + romloc);
		romMode = "querystring";
		romUploadCallback([{path: romFilename, data: data}]);
	}, function(error) {
		alert("Could not get ROM at " + romloc + " (Error " + error + ")");
		romMode = "upload";
		ffd.style.display = "block";
	});
}

// safe writeFile
function safeWriteFile(path, data) {
	FS.createPath("/", path.split("/").slice(1, -1).join("/"), true, true);
	return FS.writeFile(path, data);
}

function uploadNCreate() {
	uploadFile("", function(file) {
		FS.writeFile("/" + file.name, new Uint8Array(file.data));
	});
}

// console window
var conw = new jswindow({title: "Console", icon: "assets/terminal.svg"});

var wconsole = document.createElement("textarea");
wconsole.classList.add("console");
wconsole.setAttribute("spellcheck", "false");
wconsole.setAttribute("readonly", "");

wconsole.wconsolemarker = document.createElement("span");
wconsole.wconsolemarker.classList.add("consolemarker");

wconsole.wconsoleinput = document.createElement("input");
wconsole.wconsoleinput.type = "text";
wconsole.wconsoleinput.classList.add("consoleinput");
wconsole.wconsoleinput.title = "You can type things here as though you were using the browser console.";
wconsole.wconsoleinput.setAttribute("spellcheck", "false");
wconsole.wconsolemarker.onclick = function() { wconsole.wconsoleinput.focus(); }
wconsole.wconsoleinput.onkeydown = async function(e) {
	e.stopPropagation();
	if (e.isTrusted && e.code == "Enter") {
		log(await eval("(async function() { return " + this.value + " })()"), this.value);
		this.value = "";
	}
}

conw.innerWindow.appendChild(wconsole);
conw.innerWindow.appendChild(wconsole.wconsolemarker);
conw.innerWindow.appendChild(wconsole.wconsoleinput);

consoleButton.onclick = function() {
	conw.open({width: 450, height: 250, left: 100, top: 50});
	wconsole.wconsoleinput.focus();
	wconsole.scrollTo({top: wconsole.scrollHeight});
}

if (queries.hasOwnProperty("console")) conw.open({width: 450, height: 250, left: 100, top: 50});

// fullscreen button
fullscreenButton.onclick = function() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.body.requestFullscreen();
	}
}

// theme selector
function setTheme(theme) {
	if (themes.hasOwnProperty(theme)) {
		document.body.dataset.theme = themes[theme].id;
		menuHeight = themes[theme].menuHeight;
		adjustMenuHeight();
	}
}

currentTheme = localStorage.getItem("webretro_settings_theme") || defaultTheme;
setTheme(currentTheme);
try {
	themeSelector.querySelector("[value=" + currentTheme + "]").checked = true;
} catch (e) {
	console.warn(e);
}

themeSelector.onchange = function(e) {
	currentTheme = e.target.value;
	setTheme(currentTheme);
	localStorage.setItem("webretro_settings_theme", currentTheme);
}

// modal windows (managers)
function openManager(type) {
	if (managers[type]) {
		if (managerClosed[currentManager]) managerClosed[currentManager]();
		currentManager = type;
		if (managerOpened[type]) managerOpened[type]();
		managerTitle.textContent = capitalize(managerNames[type] || type + "s");
		clearManagers();
		managers[type].style.display = "block";
		modals.style.display = "block";
	}
}

function clearManagers() {
	Object.values(managers).forEach(function(e) {
		e.style.display = "none";
	});
}

function closeManagers() {
	modals.style.display = "none";
	clearManagers();
	managerTitle.textContent = "";
	if (managerClosed[currentManager]) managerClosed[currentManager]();
	currentManager = undefined;
}

managerClose.onclick = closeManagers;

// --- code for the keybind manager ---

// convert between config strings and objects
function configStrToObj(str) {
	var convert1 = str.slice(0, -1).split("\n");
	var convert2 = {};
	for (var i = 0; i < convert1.length; i++) {
		var convert3 = convert1[i].split(" = ");
		convert2[convert3[0]] = convert3[1].slice(1, -1);
	}
	return convert2;
}

function configObjToStr(obj) {
	var convert1 = Object.keys(obj);
	var convert2 = "";
	for (var i = 0; i < convert1.length; i++) {
		convert2 += convert1[i] + ' = "' + obj[convert1[i]] + '"\n';
	}
	return convert2;
}

// load config saved in localStorage
var defaultKeybindsObj = configStrToObj(defaultKeybinds);
var savedKeybindsObj = localStorage.getItem("RetroArch_settings_keybinds") ? Object.assign(Object.assign({}, defaultKeybindsObj), configStrToObj(localStorage.getItem("RetroArch_settings_keybinds"))) : Object.assign({}, defaultKeybindsObj);
var keybindsObj = Object.assign({}, savedKeybindsObj);

var validKeybinds = Object.keys(defaultKeybindsObj);

// update the config list
function createConfigList() {
	keybindTable.innerHTML = "";
	// make the list
	for (var i = 0; i < validKeybinds.length; i++) {
		keybindTable.innerHTML += "<tr><td>" + validKeybinds[i].replace(/^input_/, "") + "</td><td>" + keybindsObj[validKeybinds[i]] + "</td></tr>";
	}
	// highlight conflicting keys
	var keysList = Object.values(keybindsObj);
	for (var i = 0; i < validKeybinds.length; i++) {
		var matches = keysList.filter(v => v == keybindsObj[validKeybinds[i]]);
		if (matches.length > 1 && !(matches[0] == "nul")) keybindTable.children[i].lastElementChild.classList.add("conflict");
	}
}

// rebinding a key
keybindTable.onclick = function(e) {
	if (e.target.tagName == "TD" && !e.target.nextElementSibling) {
		let valueElement = e.target;
		let keyNo = Array.from(keybindTable.children).indexOf(e.target.parentElement);
		valueElement.classList.remove("conflict");
		valueElement.textContent = "press a key (escape to unbind)";
		
		function newKeyHandler(e) {
			if (e.code == "Escape") {
				keybindsObj[validKeybinds[keyNo]] = "nul";
				createConfigList();
			} else {
				keybindsObj[validKeybinds[keyNo]] = codeToConfigIDMap[e.code] || "nul";
				createConfigList();
			}
			finishKeybindInput();
		}
		function cancelKeybindInput() {
			finishKeybindInput();
			createConfigList();
		}
		function finishKeybindInput() {
			document.removeEventListener("keydown", newKeyHandler);
			document.removeEventListener("mousedown", cancelKeybindInput);
		}
		document.addEventListener("keydown", newKeyHandler, false);
		document.addEventListener("mousedown", cancelKeybindInput, false);
	}
}

function tryApplyConfig() {
	if (mainCompleted) {
		FS.writeFile("/home/web_user/retroarch/userdata/retroarch.cfg", nulKeys + configObjToStr(savedKeybindsObj) + extraConfig);
		Module._cmd_reload_config();
	}
}

// save the keybinds to localStorage, and apply them
saveKeybinds.onclick = function() {
	savedKeybindsObj = Object.assign({}, keybindsObj);
	localStorage.setItem("RetroArch_settings_keybinds", configObjToStr(savedKeybindsObj));
	tryApplyConfig();
	alert("Saved!");
}

resetKeybinds.onclick = function() {
	if (confirm("Are you sure you want to reset all of the keybinds to their default values?")) {
		savedKeybindsObj = Object.assign({}, defaultKeybindsObj);
		keybindsObj = Object.assign({}, savedKeybindsObj);
		localStorage.removeItem("RetroArch_settings_keybinds");
		createConfigList();
		tryApplyConfig();
	}
}

// --- code for the screenshot manager ---

// zip and download all of the screenshots in the list
downloadAllScreenshots.onclick = function() {
	if (screenshotDatas.length) {
		zipFiles(replaceInFiles(screenshotDatas, "rom", romName), function(zd) {
			downloadFile(zd, "screenshots-" + getTime() + ".zip", "application/zip");
		});
	} else {
		alert("There are no screenshots to download!");
	}
}

// update the screenshot list
function createScreenshotList() {
	var screenshots = FS.analyzePath("/home/web_user/retroarch/userdata/screenshots/").exists ? FS.readdir("/home/web_user/retroarch/userdata/screenshots/").filter(k => ![".", ".."].includes(k)) : [];
	screenshotsDiv.innerHTML = "";
	
	for (var i = 0; i < screenshots.length; i++) {
		var screenshotData = FS.readFile("/home/web_user/retroarch/userdata/screenshots/" + screenshots[i]);
		var blobUrl = window.URL.createObjectURL(new Blob([screenshotData], {type: "image/png"}));
		screenshotDatas[i] = {path: screenshots[i], data: screenshotData.buffer};
		screenshotObjUrls[i] = blobUrl;
		screenshotsDiv.innerHTML += '<div class="screenshot"><img src="' + blobUrl + '"><input type="button" data-action="download" value="Download"><input type="button" data-action="delete" value="Delete">' + "</div>";
	}
}

// why I didn't just use the DOM? I don't know
screenshotsDiv.onclick = function(e) {
	if (e.target.tagName == "INPUT") {
		var screenshotNo = Array.from(screenshotsDiv.children).indexOf(e.target.parentElement);
		switch (e.target.dataset.action) {
			case "download":
				downloadFile(screenshotDatas[screenshotNo].data, screenshotDatas[screenshotNo].path.replace("rom", romName), "image/png");
				break;
			case "delete":
				if (confirm("Are you sure you want to delete this screenshot?")) {
					// doing all this is probably more efficient then reloading all of the screenshots
					window.URL.revokeObjectURL(screenshotObjUrls[screenshotNo]);
					FS.unlink("/home/web_user/retroarch/userdata/screenshots/" + screenshotDatas[screenshotNo].path);
					screenshotObjUrls.splice(screenshotNo, 1);
					screenshotDatas.splice(screenshotNo, 1);
					e.target.parentElement.remove();
				}
				break;
		}
	}
}

// --- code for the save/state manager ---

function updateQuotaDisplay() {
	navigator.storage.estimate().then(function(info) {
		quotaText.textContent = "Storage used (estimate): " + bytesToHumanReadable(info.usage) + " / " + bytesToHumanReadable(info.quota) + " (" + (info.usage / info.quota).toFixed(2) + "%)";
	});
}

// update the save list
function createSaveList() {
	updateQuotaDisplay();
	getAllIdbItems().then(function(items) {
		saveTable.innerHTML = "";
		// make the list
		for (var i = 0; i < items.length; i++) {
			if ((/^RetroArch_(saves|states)_/).test(items[i].key)) {
				var sName = items[i].key.replace(/^RetroArch_(saves|states)_/, "");
				var sType = (/^RetroArch_saves_/).test(items[i].key) ? "save" : "state";
				saveIDs.push({id: items[i].key, name: sName, type: sType});
				saveTable.innerHTML += "<tr><td>" + capitalize(sType) + ": " + sName + '</td><td><span data-action="download">Download</span><span data-action="delete">Delete</span></td></tr>';
			}
		}
	});
}

saveTable.onclick = function(e) {
	if (e.target.tagName == "SPAN") {
		let saveNo = Array.from(saveTable.children).indexOf(e.target.parentElement.parentElement);
		switch (e.target.dataset.action) {
			case "download":
				getIdbItem(saveIDs[saveNo].id).then(function(data) {
					if (saveIDs[saveNo].type == "save") {
						var files = replaceInFiles(saveArrToFiles(data), "ROMNAME", saveIDs[saveNo].name);
						if (files.length == 1) {
							downloadFile(files[0].data, "game-sram-" + saveIDs[saveNo].name + "-" + getTime() + "." + files[0].path.split(".").slice(1).join("."));
						} else {
							zipFiles(files, function(zd) {
								downloadFile(zd, "game-sram-" + saveIDs[saveNo].name + "-" + getTime() + ".zip", "application/zip");
							});
						}
					} else {
						downloadFile(data, "game-state-" + saveIDs[saveNo].name + "-" + getTime() + ".state");
					}
				});
				break;
			case "delete":
				if (confirm("Are you sure you want to delete this " + saveIDs[saveNo].type + ' for "' + saveIDs[saveNo].name + '"?') && confirm("Really really sure?")) {
					removeIdbItem(saveIDs[saveNo].id);
					saveIDs.splice(saveNo, 1);
					e.target.parentElement.parentElement.remove();
					updateQuotaDisplay();
				}
				break;
		}
	}
}

// --- master rom selector ---

function getMasterRom(files) {
	return new Promise(function(resolve) {
		// some auto detecting
		var recommendedExts = "";
		if (playlistCores.includes(core)) {
			recommendedExts = playlistExts;
		} else if (["dosbox", "dosbox_pure", "scummvm"].includes(core)) {
			recommendedExts = ".exe, .bat, .com";
		}
		if (recommendedExts) {
			var recommendedExtsArray = recommendedExts.split(", ");
			var detectedFiles = files.filter(i => recommendedExtsArray.includes("." + i.path.toLowerCase().split(".").slice(-1)[0]));
			// if ONLY one match is found, use it
			if (detectedFiles.length == 1) {
				resolve(files.indexOf(detectedFiles[0]));
				return;
			}
		}
		
		openManager("romSelector");
		if (recommendedExts) {
			recommendedExtensions.textContent = "Recommended file extensions: " + recommendedExts;
		} else {
			romSelectorTable.parentElement.classList.add("fulltableparent");
		}
		romSelectorTable.innerHTML = "";
		// make the list
		for (var i = 0; i < files.length; i++) {
			romSelectorTable.innerHTML += "<tr><td>" + files[i].path + "</td></tr>";
		}
		romSelectorTable.onclick = function(e) {
			closeManagers();
			resolve(Array.from(romSelectorTable.children).indexOf(e.target.parentElement));
			return;
		}
	});
}

// --- end manager-specific code ---

var managerOpened = {
	"keybind": function() {
		createConfigList();
	},
	"screenshot": function() {
		createScreenshotList();
	},
	"save": function() {
		createSaveList();
	},
	"romSelector": function() {
		managerClose.style.display = "none";
	}
};

var managerClosed = {
	"keybind": function() {
		keybindsObj = Object.assign({}, savedKeybindsObj);
	},
	"screenshot": function() {
		// clear the blob: urls used for the screenshots
		for (var i = 0; i < screenshotObjUrls.length; i++) {
			window.URL.revokeObjectURL(screenshotObjUrls[i]);
		}
		screenshotObjUrls = [];
		screenshotDatas = [];
	},
	"save": function() {
		saveIDs = [];
	},
	"romSelector": function() {
		managerClose.style.display = "initial";
	}
};

// opening the managers

keybindsButton.onclick = function(e) {
	e.preventDefault();
	openManager("keybind");
}

screenshotsButton.onclick = function(e) {
	e.preventDefault();
	openManager("screenshot");
}

savesButton.onclick = function(e) {
	e.preventDefault();
	openManager("save");
}

statesButton.onclick = function(e) {
	e.preventDefault();
	openManager("save");
};

// ---------- START LOAD ----------
(function() {
	versionIndicator.textContent = "v" + webretroVersion.toString();
	checkForUpdates();
	
	// ?system query
	if (!queries.core && queries.system) {
		var detectedCores = allCores.filter(k => systems[k].toLowerCase() == queries.system.toLowerCase());
		var usableCores = installedCores.filter(k => systems[k].toLowerCase() == queries.system.toLowerCase());
		var usingCore = usableCores.find(k => preferredCores.includes(k)) || usableCores[0];
		if (usingCore) {
			queries.core = usingCore;
		} else if (queries.system.toLowerCase() == "autodetect") {
			queries.core = "autodetect";
		} else if (!detectedCores.length) {
			alert('Could not find any cores matching the system "' + queries.system + '".');
		} else {
			alert("Found the core(s) " + detectedCores.join(", ") + ", but none were marked as installed.");
		}
	}
	
	// ?core query
	if (queries.core) {
		try {
			if (!window.chrome) alert("Best performance on Chrome!");
		} catch (e) {
			console.warn(e);
		}
		
		// show menu bar
		menuBar.style.display = "block";
		
		if (queries.core.toLowerCase() == "autodetect") {
			romUploadCallback = autodetectCoreHandler;
			systemName.textContent = "";
			readyRomUploads(".zip, " + allFileExts);
			
			document.addEventListener("DOMContentLoaded", readyLaunchQueue, false);
		} else {
			romUploadCallback = initFromFile;
			core = queries.core;
			
			setStatus("Getting core");
			// detect system for ROM upload
			systemName.textContent = systems[core] || "";
			
			// add an s to the upload button if using a multifile core
			if (multiFileCores.includes(core)) upload.value += "s";
			
			// core github link
			if (coreGithubLinks[core]) {
				coreGithub.style.setProperty("display", "inline-block", "important");
				coreGithub.href = "https://github.com/" + coreGithubLinks[core];
			}
			
			// show the pre-start options
			if (coreOptions[core]) {
				pso.style.display = "block";
				try {
					pso.querySelector("[data-core=" + core + "]").style.display = "block";
				} catch (e) {
					console.warn(e);
				}
			}
			
			getCore(core, function() {
				removeStatus("Getting core");
				log("Got core: " + core);
				if (romMode != "querystring") document.title = (coreNames[core] || core) + (appIsPwa ? "" : " | webretro");
				
				readyRomUploads([".zip" + (exclusiveMultiFileCores.includes(core) ? "" : ", .bin"), (allCores.includes(core) ? getFileExtsForCore(core) : allFileExts)].filter(i => i).join(", "));
			}, function() {
				// core loading error
				alert('Could not load specified core "' + core + '". Here is a list of available cores.');
				showCoreList();
			});
		}
		
		// ?rom query
		if (queries.rom) {
			readyRomFetch();
		} else {
			// prompt user to upload ROM file
			romMode = "upload";
			ffd.style.display = "block";
		}
	} else {
		// no core specified
		showCoreList();
	}
})();
// ----------- END LOAD -----------

// start emulator from file(s)
function initFromFile(files) {
	if (files.length == 1 && files[0].path.split(".").slice(-1)[0].toLowerCase() == "zip") {
		if (multiFileCores.includes(core)) {
			log("Zip file detected, unzipping... (multi-file ROM detected... probably)");
			
			unzipFileMulti(files[0].data, function(dataArr) {
				readyForInit(dataArr);
			}, function() {
				alert("That zip file appears to be empty!");
			});
		} else {
			log("Zip file detected, unzipping... (single-file ROM detected)");
			
			unzipFile(files[0].data, [".bin", getFileExtsForCore(core)].filter(i => i).join(", "), function(name, contents) {
				readyForInit([{path: name, data: contents}]);
			}, function() {
				alert("That zip file appears to be empty!");
			}, function() {
				alert("Couldn't find a valid ROM file in that zip file. Are you using the right core? This is " + systems[core] + ". (The ROM has to be at the base directory of the zip file)");
			});
		}
	} else {
		readyForInit(files);
	}
}

// autodetect core mode
function autodetectCoreHandler(files) {
	if (files.length == 1) {
		if (files[0].path.split(".").slice(-1)[0].toLowerCase() == "zip") {
			log("Zip file detected, unzipping...");
			
			unzipFile(files[0].data, allFileExts, function(name, contents) {
				autodetectCore(name, contents);
			}, function() {
				alert("That zip file appears to be empty!");
			}, function() {
				alert("Couldn't find a valid ROM file in that zip file. (The ROM has to be at the base directory of the zip file)");
			});
		} else {
			autodetectCore(files[0].path, files[0].data);
		}
	} else {
		alert("Unable to autodetect when multiple files are chosen");
	}
}

function autodetectCore(name, data) {
	var nameExt = "." + name.split(".").slice(-1)[0].toLowerCase();
	
	var detectedSystem = allSystems.find(k => fileExts[k].split(", ").includes(nameExt));
	
	var detectedCores = allCores.filter(k => systems[k] == detectedSystem);
	var usableCores = installedCores.filter(k => systems[k] == detectedSystem);
	var usingCore = usableCores.find(k => preferredCores.includes(k)) || usableCores[0];
	
	if (usingCore) {
		core = usingCore;
		
		setStatus("Getting core");
		
		// show the pre-start options
		if (coreOptions[core]) {
			pso.style.display = "block";
			try {
				pso.querySelector("[data-core=" + core + "]").style.display = "block";
			} catch (e) {
				console.warn(e);
			}
		}
		
		getCore(core, function() {
			removeStatus("Getting core");
			log("Got core: " + core);
			readyForInit([{path: name, data: data}]);
		});
	} else if (!detectedCores.length) {
		alert('Unrecognized file extension "' + nameExt + '". This does not mean that it is unsupported, it may just mean that it is not auto-detectable.');
	} else {
		alert("Found the core(s) " + detectedCores.join(", ") + " for system " + detectedSystem + ", but none were marked as installed.");
	}
}

// if the ROM is specified in the querystring, we will need to wait until the user has clicked to start the emulator https://goo.gl/7K7WLu
function readyForInit(files) {
	// undefine romUploadCallback to make sure initialization only happens once (it shouldn't anyway)
	romUploadCallback = function() {};
	
	// set the romName now if using single-file rom
	if (files.length == 1) {
		romName = files[0].path.split("/").slice(-1)[0].split(".")[0];
		document.title = romName + (appIsPwa ? "" : " | webretro");
	}
	
	if (queries.romshift) {
		let shift = parseInt(queries.romshift);
		for (var i = 0; i < files.length; i++) {
			files[i].data = avShift(new Uint8Array(files[i].data), shift).buffer;
		}
	}
	
	// remove the file drop listeners
	if (romUploadsReady) {
		document.removeEventListener("dragenter", fileDragEnter);
		document.removeEventListener("dragover", fileDragOver);
		document.removeEventListener("drop", fileDropped);
	}
	
	if (romMode == "querystring" && (queries.hasOwnProperty("forcestartbutton") || !isAudioAllowed())) {
		// start button (don't delete this section, audio contexts are not allowed to start until a user gesture on the page, in this case, clicking the start button) https://goo.gl/7K7WLu
		startButton.style.display = "initial";
		startButton.onclick = function() {
			startButton.style.display = "none";
			initFromData(files);
		}
	} else {
		initFromData(files);
	}
}

// prepare FS with bundle
function prepareBundle() {
	setStatus("Getting assets");
	log("Starting bundle fetch");
	let bundleSTime = performance.now();
	
	grab(bundleCdnLatest + "bundle/indexedfiles-v2.txt", "text", function(data) {
		try {
			var splitData = data.split(",,,\n");
			fsBundleDirs = JSON.parse(splitData[0]);
			fsBundleFiles = splitData[1].split("\n");
			
			// make the paths
			FS.createPath("/", baseFsBundleDir.substring(1), true, true);
			for (var i = 0; i < fsBundleDirs.length; i++) {
				FS.createPath(baseFsBundleDir + fsBundleDirs[i][0], fsBundleDirs[i][1], true, true);
			}
			
			loadingBar.style.display = "initial";
			loadingBar.value = 0;
			let step = 1 / fsBundleFiles.length;
			let num = 0;
			
			// make the files
			for (let i = 0; i < fsBundleFiles.length; i++) {
				grab(bundleCdn + "bundle" + fsBundleFiles[i], "arraybuffer", function(data) {
					FS.writeFile(baseFsBundleDir + fsBundleFiles[i], new Uint8Array(data));
					loadingBar.value += step;
					if (++num == fsBundleFiles.length) donePreparingBundle(performance.now() - bundleSTime);
				}, function() {
					bundleErrors++;
					loadingBar.value += step;
					if (++num == fsBundleFiles.length) donePreparingBundle(performance.now() - bundleSTime);
				});
			}
		} catch (e) {
			console.warn(e);
			log("Failed to get asset bundle, skipping");
			bundleReady = true;
			removeStatus("Getting assets");
		}
	}, function() {
		log("Failed to get asset bundle, skipping");
		bundleReady = true;
		removeStatus("Getting assets");
	});
}

function donePreparingBundle(tooktime) {
	loadingBar.style.display = "none";
	extraConfig += 'menu_minimal_assets = "true"\n';
	bundleReady = true;
	removeStatus("Getting assets");
	log("Finished bundle fetch in " + (tooktime / 1000).toFixed(1) + " seconds, " + bundleErrors + " errors");
}

// prepare FS with BIOSes
function prepareBios() {
	if (bioses[core]) {
		let bios = bioses[core];
		let num = 0;
		
		FS.createPath("/", baseFsSystemDir.substring(1) + bios.path, true, true);
		for (let i = 0; i < bios.files.length; i++) {
			grab(biosCdn + bios.files[i], "arraybuffer", function(data) {
				FS.writeFile(baseFsSystemDir + bios.path + bios.files[i], new Uint8Array(data));
				log("BIOS fetch: Success " + bios.files[i]);
				if (++num == bios.files.length) biosReady = true;
			}, function() {
				log("BIOS fetch: Failed " + bios.files[i]);
				if (++num == bios.files.length) biosReady = true;
			});
		}
	} else {
		biosReady = true;
	}
}

// tell the user to not rename the rom
function doNotRename() {
	if (romMode == "upload" && !localStorage.getItem("webretro_settings_pastFirstSave")) {
		alert("WARNING: Do not rename your ROM file after this! The save data is specific to the ROM file name!");
		localStorage.setItem("webretro_settings_pastFirstSave", "true");
	}
}

// converting save lists
function saveArrToObj(arr) {
	let obj = {};
	for (var i = 0; i < arr.length; i++) {
		obj[arr[i].dir + "ROMNAME" + arr[i].ext] = arr[i].data;
	}
	return obj;
}

function saveObjToArr(obj) {
	return Object.entries(obj).map(i => ({ext: i[0].split("ROMNAME")[1], dir: i[0].split("ROMNAME")[0], data: i[1]}));
}

function saveArrToFiles(arr) {
	let files = [];
	for (var i = 0; i < arr.length; i++) {
		files.push({path: arr[i].dir + "ROMNAME" + arr[i].ext, data: arr[i].data.buffer});
	}
	return files;
}

function saveFilesToArr(files) {
	let arr = [];
	for (var i = 0; i < files.length; i++) {
		arr.push({ext: files[i].path.split("ROMNAME")[1], dir: files[i].path.split("ROMNAME")[0], data: new Uint8Array(files[i].data)});
	}
	return arr;
}

// save game
function saveSRAMHandler(path) {
	saveObj[path.replace(baseFsSaveDir, "").replace("rom", "ROMNAME")] = FS.readFile(path);
	setIdbItem("RetroArch_saves_" + romName, saveObjToArr(saveObj));
	
	new sideAlert("Saved", 3000);
	
	doNotRename();
}

// save state
function saveStateHandler() {
	if (FS.analyzePath("/home/web_user/retroarch/userdata/states/rom.state").exists) {
		setIdbItem("RetroArch_states_" + romName, FS.readFile("/home/web_user/retroarch/userdata/states/rom.state"));
		
		doNotRename();
	} else {
		new sideAlert("There was an error saving state. Please try again.", 5000);
	}
}

// autosaving
function autosaveSRAM() {
	if (autosave.checked && !document.hidden && !isPaused) {
		new sideAlert("Autosaving...", 3000);
		Module._cmd_savefiles();
	}
	window.setTimeout(function() {
		autosaveSRAM();
	}, 300000);
}

// writeToFile router
function writeToFileHandler(path) {
	// console.log("%c" + path, "color: #8888ff");
	
	if (path.startsWith(baseFsSaveDir)) {
		saveSRAMHandler(path);
	} else if (path.startsWith("/home/web_user/retroarch/userdata/states/")) {
		if (path == "/home/web_user/retroarch/userdata/states/rom.state") saveStateHandler();
	}
}

// runs after emulator starts
function afterStart() {
	mainCompleted = true;
	
	adjustCanvasSize();
	menuBar.classList.add("show");
	
	// functions for save and state buttons
	
	// states
	
	saveState.classList.remove("disabled");
	saveState.onclick = function() {
		Module._cmd_save_state();
	}
	
	importState.classList.remove("disabled");
	importState.onclick = function() {
		if (noStateCores.includes(core)) {
			alert("Core does not support save states.");
		} else {
			uploadFile(".bin, .state", function(file) {
				setIdbItem("RetroArch_states_" + romName, new Uint8Array(file.data));
				FS.writeFile("/home/web_user/retroarch/userdata/states/rom.state", new Uint8Array(file.data));
				new sideAlert("Imported state (press load state)", 3000);
			});
		}
	}
	
	loadState.classList.remove("disabled");
	loadState.onclick = function() {
		Module._cmd_load_state();
	}
	
	exportState.classList.remove("disabled");
	exportState.onclick = function() {
		if (FS.analyzePath("/home/web_user/retroarch/userdata/states/rom.state").exists) {
			downloadFile(FS.readFile("/home/web_user/retroarch/userdata/states/rom.state"), "game-state-" + romName + "-" + getTime() + ".state");
		} else {
			alert("No state to export.");
		}
	}
	
	undoSaveState.classList.remove("disabled");
	undoSaveState.onclick = function() {
		Module._cmd_undo_save_state();
	}
	
	undoLoadState.classList.remove("disabled");
	undoLoadState.onclick = function() {
		Module._cmd_undo_load_state();
	}
	
	// saves
	
	saveGame.classList.remove("disabled");
	saveGame.onclick = function() {
		new sideAlert("Saving...", 3000);
		Module._cmd_savefiles();
	}
	
	importSave.classList.remove("disabled");
	importSave.onclick = function() {
		if (noSaveCores.includes(core)) {
			alert("Core does not support SRAM.");
		} else {
			function done() {
				if (confirm("Save imported. Reloading now for changes to take effect.")) {
					autosave.checked = false;
					window.onbeforeunload = function() {}
					window.location.reload();
				}
			}
			if (multiSaveCores.includes(core)) {
				uploadFileMulti(".zip, .bin, " + sramExts, function(files) {
					if (files.length == 1) {
						if (files[0].path.split(".").slice(-1)[0].toLowerCase() == "zip") {
							unzipFileMulti(files[0].data, function(uzfiles) {
								setIdbItem("RetroArch_saves_" + romName, saveFilesToArr(replaceInFiles(uzfiles, romName, "ROMNAME")));
								done();
							}, function() {
								alert("Zip File is empty");
							});
						} else {
							setIdbItem("RetroArch_saves_" + romName, [{ext: "." + files[0].path.split(".").slice(-1)[0], dir: "", data: new Uint8Array(file.data)}]);
							done();
						}
					} else {
						setIdbItem("RetroArch_saves_" + romName, saveFilesToArr(replaceInFiles(files, romName, "ROMNAME")));
						done();
					}
				});
			} else {
				uploadFile(".bin, " + sramExts, function(file) {
					setIdbItem("RetroArch_saves_" + romName, [{ext: "." + file.name.split(".").slice(-1)[0], dir: "", data: new Uint8Array(file.data)}]);
					done();
				});
			}
		}
	}
	
	exportSave.classList.remove("disabled");
	exportSave.onclick = function() {
		var files = replaceInFiles(saveArrToFiles(saveObjToArr(saveObj)), "ROMNAME", romName);
		if (!files.length) {
			alert("No save to export.");
		} else if (files.length == 1) {
			downloadFile(files[0].data, "game-sram-" + romName + "-" + getTime() + "." + files[0].path.split(".").slice(1).join("."));
		} else {
			zipFiles(files, function(zd) {
				downloadFile(zd, "game-sram-" + romName + "-" + getTime() + ".zip", "application/zip");
			});
		}
	}
	
	// start autosave loop
	autosave.removeAttribute("disabled");
	autosave.parentElement.parentElement.classList.remove("disabled");
	window.setTimeout(function() {
		autosaveSRAM();
	}, 300000);
	
	// toggle between sharp and smooth canvas graphics
	smooth.removeAttribute("disabled");
	smooth.parentElement.parentElement.classList.remove("disabled");
	smooth.onclick = function() {
		if (this.checked) {
			canvas.className = "textureSmooth";
		} else {
			canvas.className = "texturePixelated";
		}
	}
	
	// pause and resume
	pause.classList.remove("disabled");
	pause.onclick = function() {
		if (this.textContent.trim() == "Pause") {
			Module.pauseMainLoop();
			isPaused = true;
			this.textContent = "Resume";
			document.body.classList.add("paused");
		} else {
			Module.resumeMainLoop();
			isPaused = false;
			this.textContent = "Pause";
			document.body.classList.remove("paused");
		}
	}
	resumeOverlay.onclick = function() {
		pause.click();
	}
	
	// toggle menu
	menuButton.classList.remove("disabled");
	menuButton.onclick = function() {
		Module._cmd_toggle_menu();
	}
	
	// reset
	resetButton.classList.remove("disabled");
	resetButton.onclick = function() {
		Module._cmd_reset();
	}
	resetButton2.classList.remove("disabled");
	resetButton2.onclick = function() {
		Module._cmd_reset();
	}
	
	// toggle mouse grab
	mouseGrabButton.classList.remove("disabled");
	mouseGrabButton.onclick = function(e) {
		e.target.parentElement.style.display = "none";
		Module._cmd_toggle_grab_mouse();
		window.setTimeout(function() {
			canvas.focus();
			canvas.requestPointerLock();
			e.target.parentElement.style.display = "";
		}, 20);
	}
	
	// toggle game focus
	gameFocusButton.classList.remove("disabled");
	gameFocusButton.onclick = function(e) {
		e.target.parentElement.style.display = "none";
		Module._cmd_toggle_game_focus();
		window.setTimeout(function() {
			canvas.focus();
			canvas.requestPointerLock();
			e.target.parentElement.style.display = "";
		}, 20);
	}
	
	// screenshot button
	takeScreenshot.classList.remove("disabled");
	takeScreenshot.onclick = function() {
		Module._cmd_take_screenshot();
	}
	
	// ctrl+v inside canvas
	document.addEventListener("keydown", function(e) {
		if (e.ctrlKey && e.code == "KeyV") {
			fakeKeyPress({code: "Backspace"});
			navigator.clipboard.readText().then(function(text) {
				sendText(text);
			});
		}
	}, false);
}

// start
function initFromData(data) {
	window.onbeforeunload = function() { return true; }
	async function waitForReady() {
		if (wasmReady && bundleReady && biosReady) {
			setStatus("Waiting for emulator");
			log(data.length == 1 ? "Initializing with " + bytesToHumanReadable(data[0].data.byteLength) + " of data" : "Initializing with multiple files");
			updateNotice.style.display = "none";
			canvas.addEventListener("contextmenu", function(e) {
				e.preventDefault();
			}, false);
			adjustCanvasSize();
			
			// prevent defaults for key presses
			document.addEventListener("keydown", function(e) {
				if (pdKeys.includes(e.which)) e.preventDefault();
			}, false);
			
			// fix for iframe bug
			if (window.self != window.top) {
				canvas.addEventListener("mousedown", function() {
					window.focus();
				}, false);
				if (!queries.hasOwnProperty("noautorefocus")) {
					window.addEventListener("blur", function(e) {
						window.setTimeout(function() {
							window.focus();
						}, 0);
					}, false);
				}
			}
			
			// create the rom(s) in the filesystem
			if (data.length == 1) {
				// single-rom mode
				
				realRomExt = data[0].path.split(".").slice(-1)[0] || "bin";
				FS.createPath("/", "rom", true, true);
				FS.writeFile("/rom/rom." + realRomExt, new Uint8Array(data[0].data));
				Module.arguments[0] = "/rom/rom." + realRomExt;
			} else {
				// multi-rom mode
				
				var masterIndex = await getMasterRom(data);
				
				// now set the romName for multi-file roms
				romName = data[masterIndex].path.split("/").slice(-1)[0].split(".")[0];
				document.title = romName + (appIsPwa ? "" : " | webretro");
				
				realRomExt = data[masterIndex].path.split(".").slice(-1)[0] || "bin";
				data[masterIndex].path = "rom." + realRomExt;
				Module.arguments[0] = "/rom/" + data[masterIndex].path;
				
				// optionally rename any direct dependencies to "rom"
				if (exclusiveMultiFileCores.includes(core) && confirm('Rename similar files? (Use if you get "Unable to find rom" errors. Otherwise don\'t use.)')) {
					for (var i = 0; i < data.length; i++) {
						if (!data[i].path.includes("/")) data[i].path = data[i].path.replace(romName, "rom");
					}
				}
				
				FS.createPath("/", "rom", true, true);
				var parentDirs = Array.from(new Set(data.map(i => i.path.split("/").slice(0, -1).join("/")))).filter(i => i);
				
				// create directories
				for (var i = 0; i < parentDirs.length; i++) {
					FS.createPath("/rom/", parentDirs[i], true, true);
				}
				
				// create files
				for (var i = 0; i < data.length; i++) {
					FS.writeFile("/rom/" + data[i].path, new Uint8Array(data[i].data));
				}
			}
			
			// load save
			var cSave = await getIdbItem("RetroArch_saves_" + romName);
			if (cSave) {
				saveObj = saveArrToObj(cSave);
				FS.createPath("/", baseFsSaveDir.substring(1), true, true);
				for (var i = 0; i < cSave.length; i++) {
					safeWriteFile(baseFsSaveDir + cSave[i].dir + "rom" + cSave[i].ext, cSave[i].data);
				}
				new sideAlert("Save loaded for " + romName, 5000);
				log("Save loaded for " + romName);
			}
			
			// import state
			var cState = await getIdbItem("RetroArch_states_" + romName);
			if (cState) {
				FS.createPath("/", "home/web_user/retroarch/userdata/states", true, true);
				FS.writeFile("/home/web_user/retroarch/userdata/states/rom.state", cState);
				new sideAlert("State imported for " + romName + " (press load state)", 5000);
				log("State imported for " + romName);
			}
			
			// config
			safeWriteFile("/home/web_user/retroarch/userdata/retroarch.cfg", nulKeys + configObjToStr(savedKeybindsObj) + extraConfig);
			
			// get the core options
			var coreOptionsString = "";
			if (coreOptions[core]) {
				pso.style.display = "none";
				try {
					var opts = pso.querySelectorAll("[data-core=" + core + "] input");
					for (var i = 0; i < opts.length; i++) {
						if (opts[i].checked && coreOptions[core][opts[i].dataset.opt]) coreOptionsString += coreOptions[core][opts[i].dataset.opt];
					}
				} catch (e) {
					console.warn(e);
				}
			}
			
			// core-specific config (will be revised in the future)
			switch (core) {
				case "a5200":
					safeWriteFile(baseFsConfigDir + "a5200/a5200.opt", coreOptionsString);
					break;
				case "mednafen_psx":
					safeWriteFile(baseFsConfigDir + "Beetle PSX/Beetle PSX.opt", coreOptionsString);
					break;
				case "mednafen_psx_hw":
					safeWriteFile(baseFsConfigDir + "Beetle PSX HW/Beetle PSX HW.opt", coreOptionsString);
					break;
				case "mednafen_vb":
					safeWriteFile(baseFsConfigDir + "Beetle VB/Beetle VB.opt", coreOptionsString);
					break;
				case "mednafen_wswan":
					safeWriteFile(baseFsConfigDir + "Beetle WonderSwan/Beetle WonderSwan.opt", coreOptionsString);
					break;
				case "melonds":
					safeWriteFile(baseFsConfigDir + "melonDS/melonDS.opt", coreOptionsString + 'melonds_touch_mode = "Touch"\n');
					break;
				case "mgba":
					safeWriteFile(baseFsConfigDir + "mGBA/mGBA.opt", coreOptionsString);
					break;
				case "mupen64plus_next":
					safeWriteFile(baseFsConfigDir + "Mupen64Plus-Next/Mupen64Plus-Next.opt", coreOptionsString + 'mupen64plus-ThreadedRenderer = "False"\nmupen64plus-EnableCopyColorToRDRAM = "Off"\nmupen64plus-EnableCopyDepthToRDRAM = "Off"\n');
					break;
				case "o2em":
					safeWriteFile(baseFsConfigDir + "O2EM/O2EM.opt", coreOptionsString);
					break;
				case "parallel_n64":
					safeWriteFile(baseFsConfigDir + "ParaLLEl N64/ParaLLEl N64.opt", coreOptionsString);
					break;
				case "prosystem":
					safeWriteFile(baseFsConfigDir + "ProSystem/ProSystem.opt", coreOptionsString);
					break;
				case "snes9x": // actually a remap
					safeWriteFile(baseFsConfigDir + "remaps/Snes9x/Snes9x.rmp", coreOptionsString);
					break;
				case "stella2014":
					safeWriteFile(baseFsConfigDir + "Stella 2014/Stella 2014.opt", coreOptionsString);
					break;
				case "vecx":
					safeWriteFile(baseFsConfigDir + "VecX/VecX.opt", coreOptionsString);
					break;
				case "virtualjaguar":
					safeWriteFile(baseFsConfigDir + "Virtual Jaguar/Virtual Jaguar.opt", coreOptionsString + 'virtualjaguar_bios = "enabled"\n');
					break;
				case "yabause":
					safeWriteFile(baseFsConfigDir + "Yabause/Yabause.opt", coreOptionsString);
					break;
			}
			
			// system-specific config
			switch (systems[core]) {
				case "SNES":
					var hash = md5(u8atoutf8(new Uint8Array(data[0].data)));
					if (smasBrickFix.hasOwnProperty(hash)) {
						FS.writeFile("/rom/rom.ips", new Uint8Array(smasBrickFix[hash]));
						new sideAlert("SMAS Bricks Fixed!", 5000);
					}
					break;
			}
			
			// writeToFile tracking (needs some extra stuff since it frequently fires in groups)
			FS.trackingDelegate.onWriteToFile = function(path) {
				if (!path.startsWith("/dev/")) {
					if (writeToFileCooldown[path]) window.clearTimeout(writeToFileCooldown[path]);
					writeToFileCooldown[path] = window.setTimeout(function() {
						delete writeToFileCooldown[path];
						FSTracking.dispatchEvent(new CustomEvent("writeToFile", {detail: path}));
						
						// bigger delay = more lenient
					}, 1000);
				}
			}
			
			FSTracking.addEventListener("writeToFile", function(e) {
				writeToFileHandler(e.detail);
			}, false);
			
			// start
			log("Calling main...");
			try {
				Module.callMain(Module.arguments);
			} catch (e) {
				var estr = "FAILED TO CALL MAIN. CHECK BROWSER CONSOLE FOR DETAILS. (core: " + core + ")";
				alert(estr);
				log(estr);
				console.error(e);
			}
			log("Main completed...");
			
			adjustCanvasSize();
			loadingDiv.style.display = "none";
			
			window.setTimeout(afterStart, 1000);
		} else {
			window.setTimeout(waitForReady, 250);
		}
	}
	waitForReady();
}

var Module = {
	canvas: canvas,
	noInitialRun: true,
	arguments: ["/rom/rom.bin", "--verbose"],
	onRuntimeInitialized: function() {
		wasmReady = true;
		log("WASM ready");
		
		// fetch BIOSes
		prepareBios();
		
		// fetch asset bundle
		if (queries.hasOwnProperty("nobundle")) {
			bundleReady = true;
			log("Skipping bundle");
		} else {
			prepareBundle();
		}
	},
	print: function(text) {
		log("stdout: " + text);
	},
	printErr: function(text) {
		log("stderr: " + text);
	}
};
