import { FitAddon } from '@xterm/addon-fit'
import { useEffect, useRef } from 'react'
import { useXTerm } from 'react-xtermjs'
import { BasicConsole } from '../../RTSim/Simulator/Engine/ConsoleHelp'
import { Simulator } from '../../RTSim/Simulator/Simulator'
import './Terminal.css'


const RTSim = () => {
    const { instance, ref } = useXTerm()
    const fitAddon = new FitAddon()
    const setupOnce = useRef(false)
    const sim = useRef(null)
  
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
                    background: "#000000",
                    foreground: "#FFFFFF",
                },
                cursorBlink: true,
                scrollback: 0,
                screenReaderMode: false,
                
            }
            fitAddon.fit()

            CH.getWidth = () => {
                
                return instance?.cols
            }
            CH.getHeight = () => {
                
                return instance?.rows
            }
            CH.write = (text) => {
                instance?.write(text)
            }

            CH.clear_screen = () => {
                instance?.clear()

            }

            CH.show_cursor(false);
            sim.current = new Simulator();
            sim.current.setupExit(() => {
                sim.current.Engine.scenes = [];
                sim.current.Engine.scene_history = [];
                sim.current = new Simulator();
            });
            setupOnce.current = true;
            instance?.onKey(key => {
                let modifiers = {
                    ctrl: key.domEvent.ctrlKey,
                    shift: false,
                    alt: false
                }
                let input = key.key;
                if (input === '\x1b') {
                    input = "esc";
                }
                if (input.charCodeAt(0) === 13) {
                    input = "enter";
                }
                if (input.charCodeAt(0) === 32) {
                    input = "space";
                }
                if (input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90) {
                    input = input.toLowerCase();
                    modifiers.shift = true;
                }
                if (input === '\x04')
                {
                    input = "d";
                }
                if (input === '\x03')
                {
                    sim.current.Engine.onExit?.();
                }

                if (input === "\x1B[B"){
                    input = "arrowdown";
                }
                else if (input === "\x1B[A"){
                    input = "arrowup";
                }
                else if (input === "\x1B[C"){
                    input = "arrowright";
                }
                else if (input === "\x1B[D"){
                    input = "arrowleft";
                }
                else if (input.indexOf("\x1B[1;2") > -1){
                    if (input.indexOf("C") > -1){
                        input = "arrowright";
                    }
                    else if (input.indexOf("D") > -1){
                        input = "arrowleft";
                    }
                    else if (input.indexOf("A") > -1){
                        input = "arrowup";
                    }
                    else if (input.indexOf("B") > -1){
                        input = "arrowdown";
                    }
                    modifiers.shift = true;
                }
                console.log(input, modifiers);
                // console.log(input, modifiers);
                // console.log(sim.current);
                sim.current?.handleInput(input, modifiers);
            })
            
            window.onresize = () => {
                fitAddon.fit()
                sim.current.resize()
            }

            
        }
    }, [ref, instance, fitAddon])

    return <div className='terminalDiv'>
        <div ref={ref} className='terminal' />
    </div>
}


export default RTSim