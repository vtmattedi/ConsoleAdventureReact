import { FitAddon } from '@xterm/addon-fit'
import { useEffect, useState, useRef } from 'react'
import { useXTerm } from 'react-xtermjs'
import Assets from './Game/Assets/Assets'
import { BasicConsole, DefaultColors } from './Game/Base/ConsoleHelp'
import { Game, GameStates } from './Game/Game'
import { GameColors } from './Game/Base/GameColors'
import { DevMode } from './Game/Base/DevMode'
import './Mystyles.css'
import { Genie } from './Game/Genie'
import { GameState } from './Game/GameState'


const ConsoleAdventure = () => {
    const { instance, ref } = useXTerm()
    const fitAddon = new FitAddon()
    const CH = new BasicConsole();
    const setupOnce = useRef(false)
    const game = useRef(null)

    useEffect(() => {
        // Load the fit addon
        if (!setupOnce.current && instance) {
            instance?.loadAddon(fitAddon)
            fitAddon.fit()
            //instance?.resize(120, 35)
            instance.options = {
                convertEol: true,
                fontSize: 18,
                cursorStyle: 'block',
                theme: {
                    background: DefaultColors.BLACK,
                    foreground: DefaultColors.WHITE,
                },
                cursorBlink: true,
                scrollback: 2000,
                screenReaderMode: false,

            }
            const test = false;
            CH.getWidth = () => {
                fitAddon.fit();
                console.log("w", instance?.cols)
                return instance?.cols
            }
            // const s = "#".repeat(156) + "00"
            // instance?.writeln(s)
            // instance?.writeln(CH.getWidth().toFixed())
            // instance?.writeln(CH.hcenter("Console Adventure", CH.getWidth()))
            // console.log("w", instance?.cols)
            // console.log (fitAddon.proposeDimensions())
           
            if (test) {
                for (let i = 0; i < 256; i++) {
                    const w = CH.getWidth();
                    let s = CH.insert_color(DefaultColors.custom_colors(i), "Color: " + i)
                    s += CH.insert_color(DefaultColors.custom_colors(i++), "    Color: " + i)
                    s += CH.insert_color(DefaultColors.custom_colors(i++), "    Color: " + i)
                    s += CH.insert_color(DefaultColors.custom_colors(i++), "    Color: " + i)
                    s += CH.insert_color(DefaultColors.custom_colors(i++), "    Color: " + i)
                    s += CH.insert_color(DefaultColors.custom_colors(i++), "    Color: " + i)


                    instance?.writeln(CH.hcenter(s, w))
                }
                return;
            }

       
            CH.write = (text) => {
                //console.log("w", text)
                instance?.write(text)
            }
            CH.clear_screen = () => {
                instance?.clear()
                CH.clear_line()
            }
            CH.show_cursor(false);
            game.current = new Game();
            //Change some pallets
            DefaultColors.BLUE = DefaultColors.custom_colors(75)
            DefaultColors.GREEN = DefaultColors.custom_colors(83)
            DefaultColors.YELLOW = DefaultColors.custom_colors(227)
            DefaultColors.MAGENTA = DefaultColors.custom_colors(201)
            DefaultColors.CYAN = DefaultColors.custom_colors(123)
            GameColors.Reload()
            GameColors.class_colors[0].color = DefaultColors.custom_colors(215)



            setupOnce.current = true


            instance?.onKey(key => {
                if (key.key === `\x02`) {
                    DevMode.getInstance().setValue()
                    GameStates.getInstance().currentState?.rerender();
                    CH.print("Dev Mode: " + DevMode.getInstance().value)
                }
                else {
                    // console.log(key.domEvent.key.toLowerCase());
                    if (key.key) {

                        if (key.domEvent.key.toLowerCase() === " ")
                            game.current.handleInput("space");
                        else
                            game.current.handleInput(key.domEvent.key.toLowerCase());
                    }
                    GameStates.getInstance().currentState?.render();
                }
            })
            game.current.exitTheGame = () => {
                GameStates.getInstance().currentState = new GameState(
                    () => {
                        CH.clear_screen();
                        Genie.getInstance().goodbye(
                            game.current.player.name
                        );
                        const s = "Press " + CH.insert_color(DefaultColors.YELLOW, "F5") + " key to restart."
                        CH.print(CH.hcenter(s, CH.getWidth()))
                    },
                    () => { },
                    () => { },
                    () => { },
                );
                //GameStates.getInstance().currentState.rerender();

            }
            window.onresize = () => {
                fitAddon.fit()
                GameStates.getInstance().currentState?.rerender();
            }

            Assets.Logos.animate(
                Assets.Logos.ConsoleAdventure,
                15,
                { color: DefaultColors.GREEN, index: Assets.Logos.ca_cutoff, bgcolor: DefaultColors.YELLOW },
                true,
                () => {
                    instance?.reset()
                    setTimeout(() => {
                        GameStates.getInstance().currentState = game.current.mainMenu;
                        GameStates.getInstance().currentState.rerender();
                    }, 5)

                }
            )
            // GameStates.getInstance().currentState = game.current.mainMenu;
            // GameStates.getInstance().currentState.rerender();


        }
    }, [ref, instance])

    return <div className='terminalDiv'>
        <div ref={ref} className='terminal' />
    </div>
}


export default ConsoleAdventure