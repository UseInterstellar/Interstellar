Game.buildingData = (function () {

    var instance = {};

    var baseProducerBuilding = {
        type: BUILDING_TYPE.PRODUCER,
        unlocked: false,
        maxCount: Number.MAX_VALUE,
        costType: COST_TYPE.FIXED
    };

    // Energy
    instance.energyT1 = $.extend({}, baseProducerBuilding, {
        name: 'Charcoal Engine',
        desc: 'Burns Charcoal to produce a steady source of Energy.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 2,
            'charcoal': -1
        },
        cost: {
            'metal': 50,
            'gem': 25
        }
    });

    instance.energyT2 = $.extend({}, baseProducerBuilding, {
        name: 'Solar Panel',
        desc: 'Gains Energy slowly from the sun without using any resources.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 1.5
        },
        cost: {
            'metal': 30,
            'gem': 35
        }
    });

    instance.energyT3 = $.extend({}, baseProducerBuilding, {
        name: 'Methane Power Station',
        desc: 'Burn powerful methane from Venus to satisfy all your power needs.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 23,
            'methane': -6
        },
        cost: {
            'lunarite': 110,
            'titanium': 90
        }
    });

    instance.energyT4 = $.extend({}, baseProducerBuilding, {
        name: 'Nuclear Power Station',
        desc: 'Uses fission to create large amounts of power.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 153,
            'uranium': -7
        },
        cost: {
            'lunarite': 20000,
            'titanium': 10000
        }
    });

    instance.energyT5 = $.extend({}, baseProducerBuilding, {
        name: 'Magmatic Dynamo',
        desc: 'The Magmatic Dynamo is a method of producing power by using lava as a fuel. Because of the extreme temperature of lava, a lot of Energy can be produced at once.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 191,
            'lava': -11
        },
        cost: {
            'lunarite': 25000,
            'gem': 30000,
            'silver': 20000
        }
    });

    instance.energyT6 = $.extend({}, baseProducerBuilding, {
        name: 'Fusion Reactor',
        desc: 'In a fusion reaction, Energy is released when two light atomic nuclei are fused together to form one heavier atom. This is the same reaction that occurs in stars and produces a lot of power.',
        resource: 'energy',
        resourcePerSecond: {
            'energy': 273,
            'hydrogen': -10,
            'helium': -10
        },
        cost: {
            'lunarite': 30000,
            'titanium': 20000,
            'silicon': 15000
        }
    });

    // Plasma
    instance.plasmaT1 = $.extend({}, baseProducerBuilding, {
        name: 'Super-Heater',
        desc: 'The Super-Heater throws electricity at Hydrogen to turn it into a plasmatic substance.',
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -1000,
            'hydrogen': -10,
            'plasma': 1
        },
        cost: {
            'lunarite': 75000,
            'gem': 68000,
            'silicon': 59000
        }
    });

    instance.plasmaT2 = $.extend({}, baseProducerBuilding, {
        name: 'Plasmatic Pit',
        desc: 'This contraption converts Helium into Plasma through firing intensive energy bolts at the gas cloud.',
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -8500,
            'helium': -80,
            'plasma': 10
        },
        cost: {
            'lunarite': 810000,
            'silicon': 720000,
            'meteorite': 970
        }
    });

    instance.plasmaT3 = $.extend({}, baseProducerBuilding, {
        name: 'Electron Bath',
        desc: 'Bathing in Electrons. What could go wrong?',
        resource: 'plasma',
        resourcePerSecond: {
            'energy': -15000,
            'helium': -100,
            'hydrogen': -100,
            'plasma': 140
        },
        cost: {
            'lunarite': 6200000,
            'silicon': 5900000,
            'meteorite': 12100
        }
    });

    // Uranium
    instance.uraniumT1 = $.extend({}, baseProducerBuilding, {
        name: 'Grinder',
        desc: 'Pulverizes Uranium for easy transportation out of deep mineshafts.',
        resource: 'uranium',
        resourcePerSecond: {
            'uranium': 1
        },
        cost: {
            'lunarite': 4000,
            'titanium': 2000,
            'gold': 2000
        }
    });

    instance.uraniumT2 = $.extend({}, baseProducerBuilding, {
        name: 'Cubic Teleposer',
        desc: 'This teleposes blocks of rock from far underground to the surface so that Uranium can be mined more easily.',
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -40,
            'uranium': 9
        },
        cost: {
            'lunarite': 10000,
            'uranium': 80,
            'oil': 10000
        }
    });

    instance.uraniumT3 = $.extend({}, baseProducerBuilding, {
        name: 'Uranium Enricher',
        desc: 'The Enricher increases the quality of uranium mined and thus allows more of the uranium in rocks to be used in your company.',
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -180,
            'uranium': 61
        },
        cost: {
            'lunarite': 21700,
            'titanium': 23000,
            'silicon': 13500
        }
    });

    instance.uraniumT4 = $.extend({}, baseProducerBuilding, {
        name: 'Yellowcake Recycler',
        desc: 'Recycles used-up Uranium to provide the resources with a second use. This greatly increases the amount of Uranium you can use per second.',
        resource: 'uranium',
        resourcePerSecond: {
            'energy': -436,
            'uranium': 235
        },
        cost: {
            'lunarite': 93100,
            'methane': 47000,
            'meteorite': 830
        }
    });

    // Lava
    instance.lavaT1 = $.extend({}, baseProducerBuilding, {
        name: 'Heat Resistant Crucible',
        desc: 'You can use a modified crucible to pick up lava and to store it for later use.',
        resource: 'lava',
        resourcePerSecond: {
            'lava': 1
        },
        cost: {
            'lunarite': 4000,
            'gem': 7000
        }
    });

    instance.lavaT2 = $.extend({}, baseProducerBuilding, {
        name: 'Lava Extractor',
        desc: 'This extracts lava from volcanoes automatically and quickly.',
        resource: 'lava',
        resourcePerSecond: {
            'energy': -58,
            'lava': 7
        },
        cost: {
            'lunarite': 16000,
            'titanium': 14000,
            'silicon': 6000
        }
    });

    instance.lavaT3 = $.extend({}, baseProducerBuilding, {
        name: 'Igneous Extruder',
        desc: 'Instead of going out and finding lava, it can be more convenient to make it yourself with heat and pressure.',
        resource: 'lava',
        resourcePerSecond: {
            'energy': -237,
            'lava': 43
        },
        cost: {
            'lunarite': 69000,
            'titanium': 57000,
            'silicon': 39000
        }
    });

    instance.lavaT4 = $.extend({}, baseProducerBuilding, {
        name: 'Volcanic Veluptuator',
        desc: 'A melting pot of misery, pouring lava out from mined rock.',
        resource: 'lava',
        resourcePerSecond: {
            'energy': -689,
            'lava': 187
        },
        cost: {
            'lunarite': 298000,
            'gold': 121000,
            'meteorite': 750
        }
    });

    /********************
     * Earth Resources  *
     ********************/

    // Oil
    instance.oilT1 = $.extend({}, baseProducerBuilding, {
        name: 'Small Pump',
        desc: 'Build a small pump to extract Oil from the ground.',
        resource: 'oil',
        resourcePerSecond: {
            'oil': 1
        },
        cost: {
            'metal': 60,
            'gem': 20
        }
    });

    instance.oilT2 = $.extend({}, baseProducerBuilding, {
        name: 'Pumpjack',
        desc: 'Pumpjacks are much bigger than small pumps and produce Oil on an industrial scale but they require a lot of Energy.',
        resource: 'oil',
        resourcePerSecond: {
            'energy': -4,
            'oil': 10
        },
        cost: {
            'metal': 250,
            'gem': 80,
            'oil': 50
        }
    });

    instance.oilT3 = $.extend({}, baseProducerBuilding, {
        name: 'Oil Field',
        desc: 'Oil Fields are large open spaces, usually found in deserts where vast oil wells can be found under the ground.',
        resource: 'oil',
        resourcePerSecond: {
            'energy': -12,
            'oil': 63
        },
        cost: {
            'lunarite': 2400,
            'titanium': 2700,
            'silicon': 3900
        }
    });

    instance.oilT4 = $.extend({}, baseProducerBuilding, {
        name: 'Offshore Rig',
        desc: 'Offshore Rigs are megastructures floating in the oceans, extracting Oil from under the sea-beds.',
        resource: 'oil',
        resourcePerSecond: {
            'energy': -44,
            'oil': 246
        },
        cost: {
            'lunarite': 19400,
            'titanium': 16800,
            'meteorite': 760
        }
    });

    // Metal
    instance.metalT1 = $.extend({}, baseProducerBuilding, {
        name: 'Miner',
        desc: 'Build a pickaxe for your miner.',
        resource: 'metal',
        unlocked: true,
        resourcePerSecond: {
            'metal': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance.metalT2 = $.extend({}, baseProducerBuilding, {
        name: 'Heavy Drill',
        desc: 'Heavy Drills mine Metal at mass.',
        resource: 'metal',
        resourcePerSecond: {
            'energy': -2,
            'metal': 8
        },
        cost: {
            'metal': 160,
            'gem': 60,
            'oil': 50
        }
    });

    instance.metalT3 = $.extend({}, baseProducerBuilding, {
        name: 'Giga Drill',
        desc: 'Giga Drills extract Metal at colossal speeds.',
        resource: 'metal',
        resourcePerSecond: {
            'energy': -9,
            'metal': 108
        },
        cost: {
            'lunarite': 2800,
            'gem': 3400,
            'silicon': 4100
        }
    });

    instance.metalT4 = $.extend({}, baseProducerBuilding, {
        name: 'Quantum Drill',
        desc: 'Quantum Drills bend the space-time continuum to get metal faster than physically possible.',
        resource: 'metal',
        resourcePerSecond: {
            'energy': -24,
            'metal': 427
        },
        cost: {
            'lunarite': 29000,
            'gold': 18700,
            'meteorite': 900
        }
    });

    // Gem
    instance.gemT1 = $.extend({}, baseProducerBuilding, {
        name: 'Gem Miner',
        desc: 'Build an improved pickaxe to mine Gems.',
        resource: 'gem',
        unlocked: true,
        resourcePerSecond: {
            'gem': 1
        },
        cost: {
            'metal': 15,
            'gem': 10
        }
    });

    instance.gemT2 = $.extend({}, baseProducerBuilding, {
        name: 'Advanced Drill',
        desc: 'Advanced Drills mine gem at mass. Because of the toughness of the drill needed it is slower than the heavy drill.',
        resource: 'gem',
        resourcePerSecond: {
            'energy': -2,
            'gem': 4
        },
        cost: {
            'metal': 120,
            'gem': 200,
            'oil': 60
        }
    });

    instance.gemT3 = $.extend({}, baseProducerBuilding, {
        name: 'Diamond Encrusted Drill',
        desc: 'The Diamond Encrusted Drill is one of the strongest drills in the solar system, and as such, can collect Gems faster than anything before it.',
        resource: 'gem',
        resourcePerSecond: {
            'energy': -15,
            'gem': 89
        },
        cost: {
            'lunarite': 3400,
            'gem': 8000,
            'silicon': 4500
        }
    });

    instance.gemT4 = $.extend({}, baseProducerBuilding, {
        name: 'Carbyne Drill',
        desc: 'Carbyne Drills one of the strongest drills in the solar system, and as such, can collect Gems faster than anything before it.',
        resource: 'gem',
        resourcePerSecond: {
            'energy': -40,
            'gem': 358
        },
        cost: {
            'lunarite': 21000,
            'gem': 27000,
            'meteorite': 800
        }
    });

    // Charcoal
    instance.charcoalT1 = $.extend({}, baseProducerBuilding, {
        name: 'Woodburner',
        desc: 'Build a shovel for your woodburner.',
        resource: 'charcoal',
        resourcePerSecond: {
            'wood': -2,
            'charcoal': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance.charcoalT2 = $.extend({}, baseProducerBuilding, {
        name: 'Furnace',
        desc: 'Furnaces use electric heaters to produce heat to turn Wood into Charcoal. Because of the increased heat, the process is more efficient.',
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -3,
            'wood': -6,
            'charcoal': 4
        },
        cost: {
            'metal': 80,
            'wood': 40,
            'oil': 100
        }
    });

    instance.charcoalT3 = $.extend({}, baseProducerBuilding, {
        name: 'Industrial Kiln',
        desc: 'These large kilns are much for effective than previous methods of creating charcoal and use less wood to make the same amount as a furnace.',
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -13,
            'wood': -56,
            'charcoal': 53
        },
        cost: {
            'lunarite': 3500,
            'gem': 6200,
            'silicon': 3800
        }
    });

    instance.charcoalT4 = $.extend({}, baseProducerBuilding, {
        name: 'Forest Fryer',
        desc: 'Forests? What forests?',
        resource: 'charcoal',
        resourcePerSecond: {
            'energy': -34,
            'wood': -148,
            'charcoal': 210
        },
        cost: {
            'lunarite': 15800,
            'lava': 12500,
            'meteorite': 560
        }
    });

    // Wood
    instance.woodT1 = $.extend({}, baseProducerBuilding, {
        name: 'Woodcutter',
        desc: 'Build an axe for your woodcutter.',
        resource: 'wood',
        unlocked: true,
        resourcePerSecond: {
            'wood': 1
        },
        cost: {
            'metal': 10,
            'wood': 5
        }
    });

    instance.woodT2 = $.extend({}, baseProducerBuilding, {
        name: 'Laser Cutter',
        desc: 'Laser Cutters slice trees (and fingers) quicker than axes and produce a lot more wood.',
        resource: 'wood',
        resourcePerSecond: {
            'energy': -4,
            'wood': 6
        },
        cost: {
            'metal': 50,
            'gem': 90,
            'oil': 40
        }
    });

    instance.woodT3 = $.extend({}, baseProducerBuilding, {
        name: 'Mass Deforester',
        desc: 'This machine is the reason we\'re losing our rainforests. At least we get lots of wood!',
        resource: 'wood',
        resourcePerSecond: {
            'energy': -16,
            'wood': 74
        },
        cost: {
            'lunarite': 3000,
            'titanium': 2700,
            'silicon': 2500
        }
    });

    instance.woodT4 = $.extend({}, baseProducerBuilding, {
        name: 'Biomass Infuser',
        desc: 'Creates Wood using old, useless materials found everywhere on Earth by crushing them and packing what remains as densely as possible until it can be used as Wood again.',
        resource: 'wood',
        resourcePerSecond: {
            'energy': -43,
            'wood': 297
        },
        cost: {
            'lunarite': 16000,
            'oil': 31200,
            'meteorite': 490
        }
    });

    // Silicon
    instance.siliconT1 = $.extend({}, baseProducerBuilding, {
        name: 'Empowered Blowtorch',
        desc: 'This type of blowtorch instantly turns sand into Silicon, but only on a small scale. To make it, extraterrestrial resources are required.',
        resource: 'silicon',
        resourcePerSecond: {
            'silicon': 1
        },
        cost: {
            'lunarite': 150,
            'titanium': 30
        }
    });

    instance.siliconT2 = $.extend({}, baseProducerBuilding, {
        name: 'Seaside Scorcher',
        desc: 'This tool almost melts parts of beaches to get silicon at a larger scale.',
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -18,
            'silicon': 9
        },
        cost: {
            'lunarite': 500,
            'gem': 1200,
            'oil': 1600
        }
    });

    instance.siliconT3 = $.extend({}, baseProducerBuilding, {
        name: 'Beach Annihilator',
        desc: 'This weapon of mass destruction has been re-labelled and now hovers above coast-lines, or what is now left of them.',
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -53,
            'silicon': 40
        },
        cost: {
            'lunarite': 3000,
            'gem': 8300,
            'silver': 2400
        }
    });

    instance.siliconT4 = $.extend({}, baseProducerBuilding, {
        name: 'Desert Destroyer',
        desc: 'This large ship orbits around the planet, focused in the Sahara Desert, tearing up sand from Earth and turning it into Silicon under intense heat.',
        resource: 'silicon',
        resourcePerSecond: {
            'energy': -138,
            'silicon': 157
        },
        cost: {
            'lunarite': 20000,
            'silicon': 17700,
            'meteorite': 400
        }
    });

    /******************************
     * Inner Planetary Resources  *
     ******************************/

    // Lunarite
    instance.lunariteT1 = $.extend({}, baseProducerBuilding, {
        name: 'Native Moon Worker',
        desc: 'Bribe local workers to mine your Lunarite.',
        resource: 'lunarite',
        resourcePerSecond: {
            'lunarite': 1
        },
        cost: {
            'gem': 500
        }
    });

    instance.lunariteT2 = $.extend({}, baseProducerBuilding, {
        name: 'Low-Gravity Drill',
        desc: 'These drills practically float!',
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -20,
            'lunarite': 10
        },
        cost: {
            'metal': 1000,
            'gem': 600,
            'oil': 400
        }
    });

    instance.lunariteT3 = $.extend({}, baseProducerBuilding, {
        name: 'Moon Quarry',
        desc: 'This quarry tears up the surface of the moon so much that it can be seen from Earth.',
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -70,
            'lunarite': 53
        },
        cost: {
            'lunarite': 8000,
            'gem': 5000,
            'silicon': 3500
        }
    });

    instance.lunariteT4 = $.extend({}, baseProducerBuilding, {
        name: 'Planetary Excavator',
        desc: 'This large machine dives deep into the Earth to find large pools of Lunarite found near the core. This is originally where the metal on the Moon comes from.',
        resource: 'lunarite',
        resourcePerSecond: {
            'energy': -182,
            'lunarite': 207
        },
        cost: {
            'titanium': 45000,
            'ice': 37000,
            'meteorite': 500
        }
    });

    // Methane
    instance.methaneT1 = $.extend({}, baseProducerBuilding, {
        name: 'Vacuum Cleaner',
        desc: 'Sucks in methane and cleans the planet at the same time!',
        resource: 'methane',
        resourcePerSecond: {
            'methane': 1
        },
        cost: {
            'lunarite': 50
        }
    });

    instance.methaneT2 = $.extend({}, baseProducerBuilding, {
        name: 'Suction Excavator',
        desc: 'Sucks more than anything!',
        resource: 'methane',
        resourcePerSecond: {
            'energy': -16,
            'methane': 8
        },
        cost: {
            'lunarite': 10000,
            'gem': 800,
            'oil': 600
        }
    });

    instance.methaneT3 = $.extend({}, baseProducerBuilding, {
        name: 'Space Cow Plantation',
        desc: 'These hold cows genetically moodified to produce methane constantly',
        resource: 'methane',
        resourcePerSecond: {
            'energy': -49,
            'methane': 37
        },
        cost: {
            'lunarite': 10000,
            'titanium': 9000,
            'silicon': 4100
        }
    });

    instance.methaneT4 = $.extend({}, baseProducerBuilding, {
        name: 'Hydrothermal Vent',
        desc: 'Collect gas from deep sea vents on the ocean floor of Titan.',
        resource: 'methane',
        resourcePerSecond: {
            'energy': -132,
            'methane': 149
        },
        cost: {
            'lunarite': 52000,
            'helium': 47000,
            'meteorite': 390
        }
    });

    // Titanium
    instance.titaniumT1 = $.extend({}, baseProducerBuilding, {
        name: 'Explorer',
        desc: 'Hire explorers to search for Titanium on the surface, uncovered by winds on Mars.',
        resource: 'titanium',
        resourcePerSecond: {
            'titanium': 1
        },
        cost: {
            'gem': 1000
        }
    });

    instance.titaniumT2 = $.extend({}, baseProducerBuilding, {
        name: 'Lunarite Drill',
        desc: 'These Lunarite Drills are extremely powerful, needed to mine out Titanium from inside Mars\' crust.',
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -13,
            'titanium': 9
        },
        cost: {
            'lunarite': 200,
            'gem': 800,
            'oil': 1000
        }
    });

    instance.titaniumT3 = $.extend({}, baseProducerBuilding, {
        name: 'Penta-Drill',
        desc: 'This is a mining machine modified to have 5 drills on its face. This allows for a massive increase in resources gained per second.',
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -46,
            'titanium': 49
        },
        cost: {
            'lunarite': 14000,
            'gem': 11000,
            'silicon': 5600
        }
    });

    instance.titaniumT4 = $.extend({}, baseProducerBuilding, {
        name: 'Drill of Titans',
        desc: 'This mighty drill is said to have been wielded by Titans themselves, many milennia ago.',
        resource: 'titanium',
        resourcePerSecond: {
            'energy': -123,
            'titanium': 197
        },
        cost: {
            'lunarite': 63000,
            'gold': 27000,
            'meteorite': 600
        }
    });

    // Gold
    instance.goldT1 = $.extend({}, baseProducerBuilding, {
        name: 'Rocket Droid',
        desc: 'Powered by Methane, this droid scouts the asteroids for gold deposits.',
        resource: 'gold',
        resourcePerSecond: {
            'gold': 1
        },
        cost: {
            'gem': 200,
            'methane': 50
        }
    });

    instance.goldT2 = $.extend({}, baseProducerBuilding, {
        name: 'Asteroid Destroyer',
        desc: 'Mines through asteroids to find Gold. It is much more effective than the simple droid.',
        resource: 'gold',
        resourcePerSecond: {
            'energy': -19,
            'gold': 8
        },
        cost: {
            'lunarite': 500,
            'gem': 1500,
            'oil': 1000
        }
    });

    instance.goldT3 = $.extend({}, baseProducerBuilding, {
        name: 'Death Star Jr',
        desc: 'That\'s no moon! That\'s a Space Station! This cuts through asteroids to expose all of the Gold in the centers.',
        resource: 'gold',
        resourcePerSecond: {
            'energy': -81,
            'gold': 51
        },
        cost: {
            'lunarite': 17000,
            'silver': 11500,
            'silicon': 8200
        }
    });

    instance.goldT4 = $.extend({}, baseProducerBuilding, {
        name: 'Chronal Actuator',
        desc: 'Speeds up time through quantum physics in order to produce even more Gold.',
        resource: 'gold',
        resourcePerSecond: {
            'energy': -223,
            'gold': 211
        },
        cost: {
            'lunarite': 61000,
            'helium': 15700,
            'meteorite': 600
        }
    });

    // Silver
    instance.silverT1 = $.extend({}, baseProducerBuilding, {
        name: 'Scout Ship',
        desc: 'The Scout Ship searches through the asteroid field for pieces of silver embedded in asteroids.',
        resource: 'silver',
        resourcePerSecond: {
            'silver': 1
        },
        cost: {
            'lunarite': 100,
            'titanium': 20
        }
    });

    instance.silverT2 = $.extend({}, baseProducerBuilding, {
        name: 'Interplanetary Laser',
        desc: 'Cuts through asteroids to find silver deposits in their cores.',
        resource: 'silver',
        resourcePerSecond: {
            'energy': -24,
            'silver': 13
        },
        cost: {
            'lunarite': 350,
            'gem': 900,
            'oil': 1200
        }
    });

    instance.silverT3 = $.extend({}, baseProducerBuilding, {
        name: 'Big Bertha',
        desc: 'This large, space drill, named after the World War One Howitzer built almost a milienia ago, is a silver seeking machine specially designed for mining asteroids.',
        resource: 'silver',
        resourcePerSecond: {
            'energy': -65,
            'silver': 53
        },
        cost: {
            'lunarite': 19500,
            'silver': 18200,
            'silicon': 11000
        }
    });

    instance.silverT4 = $.extend({}, baseProducerBuilding, {
        name: 'Atomic Cannon',
        desc: 'This powerful cannon orbits Neptune and can atomise the surface of asteroids, revealing the silver within.',
        resource: 'silver',
        resourcePerSecond: {
            'energy': -170,
            'silver': 208
        },
        cost: {
            'lunarite': 85100,
            'oil': 93800,
            'meteorite': 520
        }
    });

    /******************************
     * Outer Planetary Resources  *
     ******************************/

    // Hydrogen
    instance.hydrogenT1 = $.extend({}, baseProducerBuilding, {
        name: 'Hydrogen Collector',
        desc: 'This collector travels around Jupiter seeking Hydrogen to store to bring back to Earth.',
        resource: 'hydrogen',
        resourcePerSecond: {
            'hydrogen': 1
        },
        cost: {
            'lunarite': 6000,
            'titanium': 4800
        }
    });

    instance.hydrogenT2 = $.extend({}, baseProducerBuilding, {
        name: 'Gaseous Magnet',
        desc: 'The magnet attracts the Hydrogen to it to increase the amount collected per second.',
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -63,
            'hydrogen': 5
        },
        cost: {
            'lunarite': 10800,
            'titanium': 9600,
            'silicon': 6600
        }
    });

    instance.hydrogenT3 = $.extend({}, baseProducerBuilding, {
        name: 'Electrolytic Cell',
        desc: 'These are made here on Earth and can turn water into hydrogen with a constant supply of Energy.',
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -234,
            'hydrogen': 28
        },
        cost: {
            'silver': 37200,
            'gold': 34200,
            'silicon': 25800
        }
    });

    instance.hydrogenT4 = $.extend({}, baseProducerBuilding, {
        name: 'Hindenburg Excavation',
        desc: 'Somehow, it works.',
        resource: 'hydrogen',
        resourcePerSecond: {
            'energy': -613,
            'hydrogen': 113
        },
        cost: {
            'lunarite': 172000,
            'methane': 134000,
            'meteorite': 710
        }
    });

    // Helium
    instance.heliumT1 = $.extend({}, baseProducerBuilding, {
        name: 'Helium Drone',
        desc: 'The Helium Drone scouts out the area on Saturn and picks out spots high in Helium which are then mined slowly by it.',        resource: 'helium',
        resourcePerSecond: {
            'helium': 1
        },
        cost: {
            'lunarite': 8400,
            'titanium': 6000
        }
    });

    instance.heliumT2 = $.extend({}, baseProducerBuilding, {
        name: 'Helium Tanker',
        desc: 'This huge tanker holds large amounts of Helium and transports it from Saturn to Earth through the vacuum of space.',
        resource: 'helium',
        resourcePerSecond: {
            'energy': -72,
            'helium': 11
        },
        cost: {
            'lunarite': 12600,
            'titanium': 10200,
            'silicon': 8400
        }
    });

    instance.heliumT3 = $.extend({}, baseProducerBuilding, {
        name: 'Morphic Compressor',
        desc: 'The Compressor packs helium densely into a small space so that it can be easily transported back to Earth.',
        resource: 'helium',
        resourcePerSecond: {
            'energy': -248,
            'helium': 57
        },
        cost: {
            'lunarite': 63000,
            'titanium': 43800,
            'silicon': 35400
        }
    });

    instance.heliumT4 = $.extend({}, baseProducerBuilding, {
        name: 'Gas Giant Skimmer',
        desc: 'Flying into Gas Giants\' atmospheres with a big bucket is the best plan we\'ve had yet!',
        resource: 'helium',
        resourcePerSecond: {
            'energy': -670,
            'helium': 232
        },
        cost: {
            'lunarite': 255000,
            'titanium': 173000,
            'meteorite': 770
        }
    });

    // Ice
    instance.iceT1 = $.extend({}, baseProducerBuilding, {
        name: 'Ice Pickaxe',
        desc: 'The Ice Pickaxe is the simplest way of mining frozen water, and although it is the cheapest, it is the slowest.',
        resource: 'ice',
        resourcePerSecond: {
            'ice': 1
        },
        cost: {
            'lunarite': 17800,
            'gem': 19300
        }
    });

    instance.iceT2 = $.extend({}, baseProducerBuilding, {
        name: 'Ice Drill',
        desc: 'The Ice Drill is more effective than the Pickaxe and gains much more Ice every second. However, it does use electricity.',
        resource: 'ice',
        resourcePerSecond: {
            'energy': -83,
            'ice': 9
        },
        cost: {
            'lunarite': 23900,
            'titanium': 21200,
            'silicon': 19600
        }
    });

    instance.iceT3 = $.extend({}, baseProducerBuilding, {
        name: 'Ocean Freezer',
        desc: 'With advanced technology, you are now able to turn Earth\'s water into high-quality Ice, previously only found on Pluto.',
        resource: 'ice',
        resourcePerSecond: {
            'energy': -397,
            'ice': 65
        },
        cost: {
            'lunarite': 117000,
            'titanium': 86000,
            'silicon': 73000
        }
    });

    instance.iceT4 = $.extend({}, baseProducerBuilding, {
        name: 'Mr Freeze',
        desc: 'This robot is the coolest guy in the solar system.',
        resource: 'ice',
        resourcePerSecond: {
            'energy': -1135,
            'ice': 278
        },
        cost: {
            'wood': 379000,
            'helium': 14000,
            'meteorite': 1500
        }
    });

    // Meteorite
    instance.meteoriteT1 = $.extend({}, baseProducerBuilding, {
        name: 'Meteorite Printer',
        desc: 'Contruct an automated way of producing meteorite without you having to do anything.',
        resource: 'meteorite',
        resourcePerSecond: {
            'plasma': -3,
            'meteorite': 1
        },
        cost: {
            'lunarite': 100000,
            'silicon': 60000
        }
    });

    instance.meteoriteT2 = $.extend({}, baseProducerBuilding, {
        name: 'Meteorite Web',
        desc: 'The Meteorite Web uses nano-fibres made while submerged in highly radioactive liquids to become strong enough to physically catch meteors from the Asteroid Belt. Plasma is required to refine the asteroids into Meteorite Ore, which can be usable.',
        resource: 'meteorite',
        resourcePerSecond: {
            'plasma': -21,
            'meteorite': 8
        },
        cost: {
            'lunarite': 940000,
            'uranium': 490000,
            'silicon': 510000
        }
    });

    // Research
    instance.scienceT1 = $.extend({}, baseProducerBuilding, {
        name: 'Home Science Kit',
        desc: 'Build a small laboratory of your very own to start producing science. Each one produces 0.1 science per second.',
        resource: 'science',
        resourcePerSecond: {
            'science': 0.1
        },
        cost: {
            'metal': 20,
            'gem': 15,
            'wood': 10
        }
    });

    instance.scienceT2 = $.extend({}, baseProducerBuilding, {
        name: 'High School Science',
        desc: 'Build a more effective laboratory to continue your quest into the realm of science at a significantly faster speed. Each one produces 1 science per second.',
        resource: 'science',
        resourcePerSecond: {
            'science': 1
        },
        cost: {
            'metal': 1000,
            'gem': 200,
            'wood': 500
        }
    });

    instance.scienceT3 = $.extend({}, baseProducerBuilding, {
        name: 'University Laboratory',
        desc: 'Build an even better version of the old laboratory to further your exploration of the realm of science. Each one produces 10 science per second.',
        resource: 'science',
        resourcePerSecond: {
            'science': 10
        },
        cost: {
            'metal': 17000,
            'gem': 4700,
            'wood': 9600
        }
    });

    // Solar System
    instance.rocketFuelT1 = $.extend({}, baseProducerBuilding, {
        name: 'Chemical Plant',
        desc: 'Chemical plants are used to make rocket fuel automatically.',
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 0.2
        },
        cost: {
            'metal': 1000,
            'gem': 750,
            'wood': 500
        }
    });

    instance.rocketFuelT2 = $.extend({}, baseProducerBuilding, {
        name: 'Oxidisation Chamber',
        desc: 'Oxidisation Chambers make rocket fuel faster and more efficiently than chemical plants.',
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 1.5
        },
        cost: {
            'metal': 12000,
            'gem': 8300,
            'wood': 6800
        }
    });

    instance.rocketFuelT3 = $.extend({}, baseProducerBuilding, {
        name: 'Hydrazine Catalyst',
        desc: 'These speed up the chemical reactions needed to make rocket fuel by using greenhouse gases such as methane.',
        resource: 'rocketFuel',
        resourcePerSecond: {
            'rocketFuel': 20
        },
        cost: {
            'titanium': 140000,
            'silicon': 96300,
            'gold': 78600
        }
    });
    
    return instance;
}());
