new Vue({
    el: "#app",
    data: {
        is_game_started: false,
        player_heal: 100,
        monster_heal: 100,
        console_log: [],
        moster_attack_power: 20,
        moster_attacked_point: 0,
        player_attack_power: 10,
        player_attacked_point: 0,
        player_special_attack_power: 15,
        player_health_up: 25,
        console_log_text: [
            "Yeni mücadele başladı...",
            "Kazanmaya bir adım daha yakınsın... Atak yaptın",
            "Olamaz... canavar atak yaptı",
            "Kendine can ekledin",
            "Rakip kazandı!!!",
            "Tebrikler sen kazandın!!!!"
        ]
    },

    methods: {
        start_game: function () {
            this.is_game_started = !this.is_game_started
            this.player_heal = 100
            this.monster_heal = 100
            this.add_list(0)
        },
        attack: function () {
            this.player_attacked_point = Math.ceil(Math.random() * this.player_attack_power)
            this.add_list(1)
            this.moster_attack()
            this.monster_heal -= this.player_attacked_point
            this.check_heal(this.monster_heal, this.player_heal)
        },
        special_attack: function () {
            this.player_attacked_point = Math.ceil(Math.random() * this.player_special_attack_power)
            this.add_list(1)
            this.moster_attack()
            this.monster_heal -= this.player_attacked_point
            this.check_heal(this.monster_heal, this.player_heal)
        },
        health_up: function () {
            this.add_list(3)
            this.moster_attack()
            this.player_heal += Math.ceil(Math.random() * this.player_health_up)
            this.check_heal(this.monster_heal, this.player_heal)

        },
        give_up: function () {
            this.player_heal = 0
            this.add_list(4)
            this.end_game()
        },
        moster_attack: function () {
            this.moster_attacked_point = Math.ceil(Math.random() * this.moster_attack_power)
            this.player_heal -= this.moster_attacked_point
            this.add_list(2)
        },
        end_game: function () {
            this.start_game()
            this.clear_list()
        },
        check_heal: function (monster_heal, player_heal) {
            if (monster_heal <= 0) {
                this.add_list(5)
                setTimeout(this.end_game, 2000)
            }
            else if (player_heal <= 0) {
                this.add_list(4)
                setTimeout(this.end_game, 2000)
            }
            else {
                return false
            }
        },
        add_list: function (item) {
            this.console_log.push(this.console_log_text[item])
        },
        clear_list: function () {
            this.console_log = []
        },
        reverse_list: function () {
            this.console_log.reverse()
        }
    },
    computed: {
        platerHealthBar: function () {
            return {
                width: this.player_heal + "%"
            }
        },
        monsterHealthBar: function () {
            return {
                width: this.monster_heal + "%"
            }
        },
        monsterClass: function () {
            return {
                color: "red"
            }
        },
        playerClass: function () {
            return {
                color: "green"
            }
        }
    }
})