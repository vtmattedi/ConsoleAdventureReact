import { FitAddon } from '@xterm/addon-fit'
import { useEffect, useRef } from 'react'
import { useXTerm } from 'react-xtermjs'
import Assets from '../../Game/Assets/Assets'
import { BasicConsole, DefaultColors } from '../../Game/Base/ConsoleHelp'
import { Game, GameStates } from '../../Game/Game'
import { GameColors } from '../../Game/Base/GameColors'
import { DevMode } from '../../Game/Base/DevMode'
import './Terminal.css'
import { Genie } from '../../Game/Genie'
import { GameState } from '../../Game/GameState'


const ConsoleAdventure = () => {
    const { instance, ref } = useXTerm()
    const fitAddon = new FitAddon()
    const setupOnce = useRef(false)
    const game = useRef(null)
    const linesToClear = useRef(0)//lines printed outside of the game
    //They need to be deleted after every render to keep the console in the proper state

    useEffect(() => {
        // Load the fit addon
        if (!setupOnce.current && instance) {
            const CH = new BasicConsole(); //Singleton Setup the port overloads
            instance?.loadAddon(fitAddon)
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

            CH.getWidth = () => {
                fitAddon.fit();
                return instance?.cols
            }
            CH.write = (text) => {
                instance?.write(text)
            }

            CH.clear_screen = () => {
                instance?.clear()

            }

            CH.show_cursor(false);
            game.current = new Game();
            //Change some pallets
            DefaultColors.BLUE = DefaultColors.custom_colors(75)
            DefaultColors.GREEN = DefaultColors.custom_colors(83)
            DefaultColors.YELLOW = DefaultColors.custom_colors(227)
            DefaultColors.MAGENTA = DefaultColors.custom_colors(201)
            DefaultColors.CYAN = DefaultColors.custom_colors(123)
            GameColors.Reload() // Reaload Every color with the new values
            GameColors.class_colors[0].color = DefaultColors.custom_colors(215);

            setupOnce.current = true;
            instance?.onKey(key => {
                if (key.key === `\x02`) {
                    DevMode.getInstance().setValue()
                    GameStates.getInstance().currentState?.rerender();
                    CH.print("Dev Mode: " + DevMode.getInstance().value)
                    linesToClear.current++;
                }
                else {
                    // console.log(key.domEvent.key.toLowerCase());
                    if (key.key) {

                        if (key.domEvent.key.toLowerCase() === " ")
                            game.current.handleInput("space");
                        else
                            game.current.handleInput(key.domEvent.key.toLowerCase());
                    }
                    if ( linesToClear.current > 0) {
                        CH.clear_last_line( linesToClear.current);
                        linesToClear.current = 0;
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
                    setTimeout(() => {
                        GameStates.getInstance().currentState = game.current.mainMenu;
                        GameStates.getInstance().currentState.rerender();
                    }, 1000)

                }
            )
            // GameStates.getInstance().currentState = game.current.mainMenu;
            // GameStates.getInstance().currentState.rerender();


        }
    }, [ref, instance, fitAddon])

    return <div className='terminalDiv'>
        <div ref={ref} className='terminal' />
    </div>
}


export default ConsoleAdventure