input.onButtonPressed(Button.A, function () {
    SECONDE_TIMER = 0
})
let DELEN_door = 0
let SECONDE_TIMER = 0
led.enable(false)
lcd1602.setAddress3()
SECONDE_TIMER = 0
let posisie_van_tijd = 0
DELEN_door += 42
let DEZE_HERHALING = 0
let UUR = 0
let MINUTE = 0
let SECONDE = 0
basic.forever(function () {
    if (DEZE_HERHALING > 4) {
        SECONDE_TIMER += 1
        basic.pause(1000)
    }
    if (pins.digitalReadPin(DigitalPin.P9) == 1) {
        SECONDE_TIMER = 0
    }
})
basic.forever(function () {
    if (DEZE_HERHALING <= 2) {
        lcd1602.putString(
        "" + Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door) + " ",
        0,
        1
        )
    }
    if (DEZE_HERHALING == 4) {
        lcd1602.clear()
        DEZE_HERHALING += 1
    }
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        DEZE_HERHALING += 1
        if (DEZE_HERHALING < 4) {
            lcd1602.putNumber(
            Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door),
            posisie_van_tijd,
            0
            )
            posisie_van_tijd += convertToText(Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door)).length
            if (DEZE_HERHALING <= 2) {
                lcd1602.putString(
                ":",
                posisie_van_tijd,
                0
                )
                posisie_van_tijd += 1
            }
        }
        if (DEZE_HERHALING == 1) {
            UUR = Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door)
        }
        if (DEZE_HERHALING == 2) {
            MINUTE = Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door)
        }
        if (DEZE_HERHALING == 3) {
            SECONDE = Math.round(pins.analogReadPin(AnalogPin.P0) / DELEN_door)
            while (pins.analogReadPin(AnalogPin.P0) > 15) {
                lcd1602.putString(
                "ok",
                0,
                1
                )
            }
            DEZE_HERHALING += 1
        }
        if (DEZE_HERHALING == 4) {
            lcd1602.clear()
            lcd1602.putString(
            "" + SECONDE + MINUTE + UUR,
            0,
            0
            )
            timeanddate.set24HourTime(UUR, MINUTE, SECONDE)
        }
        DELEN_door = 17
    }
})
basic.forever(function () {
    if (DEZE_HERHALING > 4) {
        if (SECONDE_TIMER >= 20) {
            lcd1602.set_backlight(lcd1602.on_off.off)
        } else {
            lcd1602.set_backlight(lcd1602.on_off.on)
        }
        if (SECONDE_TIMER <= 20) {
            if (pins.analogReadPin(AnalogPin.P0) < 500) {
                lcd1602.putString(
                timeanddate.time(timeanddate.TimeFormat.HHMMSS24hr),
                4,
                0
                )
                lcd1602.putString(
                "               ",
                0,
                1
                )
                pins.servoWritePin(AnalogPin.P10, 0)
            }
            if (pins.analogReadPin(AnalogPin.P0) > 500) {
                lcd1602.putString(
                "      Temp      ",
                0,
                0
                )
                lcd1602.putString(
                "" + Math.round(300 * pins.analogReadPin(AnalogPin.P2) / 1023) + "            ",
                0,
                1
                )
                pins.servoWritePin(AnalogPin.P10, pins.map(
                Math.round(300 * pins.analogReadPin(AnalogPin.P2) / 1023),
                0,
                50,
                0,
                180
                ))
            }
        } else {
            lcd1602.putString(
            "     " + timeanddate.time(timeanddate.TimeFormat.HMMAMPM) + "        ",
            0,
            0
            )
            pins.servoWritePin(AnalogPin.P10, 0)
        }
    }
})
