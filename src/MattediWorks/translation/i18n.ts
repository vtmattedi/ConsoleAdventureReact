export const locales = ['en', 'pt-BR'] as const

export type Locale = typeof locales[number]

type ProjectCopy = {
  name: string
  label?: string
  summary: string
  description: string
  ctaLabel?: string
  sourceLabel?: string
  sourceAria?: string
  screenshotAlt?: string
  widthWarning?: string
  highlights?: string[]
  tags: Record<string, string>
}

export type Translation = {
  languageLabel: string
  common: {
    github: string
    loading: string
  }
  theme: {
    label: string
    light: string
    dark: string
    system: string
    switchTo: string
  }
  shell: {
    productName: string
    homeAria: string
    primaryNav: string
    back: string
    nav: {
      home: string
      consoleAdventure: string
      rtsim: string
    }
  }
  home: {
    catalogLabel: string
    intro: string
    brandPanelLabel: string
    brandPanelCopy: string
    mattediWorksLogoAlt: string
    appsTitle: string
    appsIntro: string
  }
  projects: {
    terminalEngine: ProjectCopy
    consoleAdventure: ProjectCopy
    rtsim: ProjectCopy
  }
  notFound: {
    title: string
    message: string
    backHome: string
  }
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  'pt-BR': 'PT',
}

export const translations: Record<Locale, Translation> = {
  en: {
    languageLabel: 'Language',
    common: {
      github: 'GitHub',
      loading: 'Booting up',
    },
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      switchTo: 'switch to',
    },
    shell: {
      productName: 'Terminal Applications',
      homeAria: 'Terminal Applications home',
      primaryNav: 'Primary',
      back: 'Back',
      nav: {
        home: 'Home',
        consoleAdventure: 'Console Adventure',
        rtsim: 'RTSim',
      },
    },
    home: {
      catalogLabel: 'Published catalog',
      intro: 'These are console applications built for Node.js and ported to run in the browser with xterm.js.',
      brandPanelLabel: 'MattediWorks brand',
      brandPanelCopy: 'A compact systems catalog for terminal tools, browser ports, and automation experiments.',
      mattediWorksLogoAlt: 'MattediWorks logo',
      appsTitle: 'Terminal apps',
      appsIntro: 'Browser-hosted terminal apps with canonical source links and project previews.',
    },
    projects: {
      terminalEngine: {
        label: 'Core project',
        name: 'Terminal Engine',
        summary:
          'Runtime and browser-porting work behind Terminal Applications, focused on a reliable bridge between ANSI terminal programs and xterm.js surfaces.',
        description:
          'Terminal Engine is the shared engineering effort and porting contract behind this catalog. It is not yet one extracted package used by every app.',
        highlights: [
          'RTSim currently contains the scene engine; Console Adventure uses a separate game-state runtime.',
          'Both ports share output, sizing, input, colors, rendering, and resize behavior requirements.',
        ],
        tags: {
          ansiOutput: 'ANSI output',
          xtermBridge: 'xterm.js bridge',
          runtimeBoundary: 'Runtime boundary',
          resizeContract: 'Resize contract',
        },
      },
      consoleAdventure: {
        name: 'Console Adventure',
        summary:
          'Terminal fantasy RPG for Node.js, ported to React and xterm.js so it can run in the browser.',
        description:
          'Explore the Magical Lands, fight enemies, find gear, and play a growing object-oriented terminal RPG. The source runtime runs on Node.js; this site hosts the xterm.js web port.',
        ctaLabel: 'Play Console Adventure',
        sourceLabel: 'Source: vtmattedi/ConsoleAdventure',
        sourceAria: 'Open Console Adventure source on GitHub',
        screenshotAlt: 'Console Adventure screenshot',
        widthWarning: 'You need at least 1040 px of width to see the terminal.',
        tags: {
          fantasyRpg: 'Fantasy RPG',
          nodeRuntime: 'Node.js runtime',
          xtermWebPort: 'xterm.js web port',
          turnBasedCombat: 'Turn-based combat',
        },
      },
      rtsim: {
        name: 'RTSim',
        summary:
          'Discrete-time preemptive scheduler simulator for one or more CPUs, ported to xterm.js for the browser.',
        description:
          'Simulate scheduler behavior at individual time steps using EDF, FCFS, HRRN, Priority, Round Robin, and SJF. The Node.js runtime renders a console scene that is adapted to xterm.js on the web.',
        ctaLabel: 'Scheduler Simulator',
        sourceLabel: 'Source: vtmattedi/rtsim',
        sourceAria: 'Open RTSim source on GitHub',
        screenshotAlt: 'RTSim scheduler screenshot',
        tags: {
          schedulerSimulator: 'Scheduler simulator',
          nodeRuntime: 'Node.js runtime',
          xtermWebPort: 'xterm.js web port',
          preemptiveScheduling: 'Preemptive scheduling',
        },
      },
    },
    notFound: {
      title: 'Page Not Found',
      message: 'The terminal you are looking for is not in this route.',
      backHome: 'Back Home',
    },
  },
  'pt-BR': {
    languageLabel: 'Idioma',
    common: {
      github: 'GitHub',
      loading: 'Inicializando',
    },
    theme: {
      label: 'Tema',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
      switchTo: 'mudar para',
    },
    shell: {
      productName: 'Terminal Applications',
      homeAria: 'Inicio do Terminal Applications',
      primaryNav: 'Principal',
      back: 'Voltar',
      nav: {
        home: 'Inicio',
        consoleAdventure: 'Console Adventure',
        rtsim: 'RTSim',
      },
    },
    home: {
      catalogLabel: 'Catalogo publicado',
      intro: 'Estes sao aplicativos de console criados para Node.js e portados para rodar no navegador com xterm.js.',
      brandPanelLabel: 'Marca MattediWorks',
      brandPanelCopy: 'Um catalogo compacto de sistemas para ferramentas de terminal, ports no navegador e experimentos de automacao.',
      mattediWorksLogoAlt: 'Logo MattediWorks',
      appsTitle: 'Apps de terminal',
      appsIntro: 'Apps de terminal no navegador com links canonicos de codigo e previews dos projetos.',
    },
    projects: {
      terminalEngine: {
        label: 'Projeto central',
        name: 'Terminal Engine',
        summary:
          'Trabalho de runtime e port para navegador por tras do Terminal Applications, focado em uma ponte confiavel entre programas ANSI de terminal e superficies xterm.js.',
        description:
          'Terminal Engine e o esforco compartilhado de engenharia e contrato de port por tras deste catalogo. Ainda nao e um pacote extraido usado por todos os apps.',
        highlights: [
          'RTSim contem hoje o engine de cenas; Console Adventure usa um runtime separado baseado em estados de jogo.',
          'Os dois ports compartilham requisitos de saida, tamanho, entrada, cores, renderizacao e resize.',
        ],
        tags: {
          ansiOutput: 'Saida ANSI',
          xtermBridge: 'Ponte xterm.js',
          runtimeBoundary: 'Limite de runtime',
          resizeContract: 'Contrato de resize',
        },
      },
      consoleAdventure: {
        name: 'Console Adventure',
        summary:
          'RPG de fantasia em terminal criado para Node.js e portado para React e xterm.js para rodar no navegador.',
        description:
          'Explore as Magical Lands, enfrente inimigos, encontre equipamentos e jogue um RPG de terminal orientado a objetos em expansao. O runtime fonte roda em Node.js; este site hospeda o port web com xterm.js.',
        ctaLabel: 'Jogar Console Adventure',
        sourceLabel: 'Codigo: vtmattedi/ConsoleAdventure',
        sourceAria: 'Abrir codigo do Console Adventure no GitHub',
        screenshotAlt: 'Captura de tela do Console Adventure',
        widthWarning: 'Voce precisa de pelo menos 1040 px de largura para ver o terminal.',
        tags: {
          fantasyRpg: 'RPG de fantasia',
          nodeRuntime: 'Runtime Node.js',
          xtermWebPort: 'Port web xterm.js',
          turnBasedCombat: 'Combate em turnos',
        },
      },
      rtsim: {
        name: 'RTSim',
        summary:
          'Simulador de escalonamento preemptivo em tempo discreto para uma ou mais CPUs, portado para xterm.js no navegador.',
        description:
          'Simule o comportamento do escalonador em passos discretos usando EDF, FCFS, HRRN, Priority, Round Robin e SJF. O runtime Node.js renderiza uma cena de console adaptada para xterm.js na web.',
        ctaLabel: 'Simulador Escalonador',
        sourceLabel: 'Codigo: vtmattedi/rtsim',
        sourceAria: 'Abrir codigo do RTSim no GitHub',
        screenshotAlt: 'Captura de tela do RTSim',
        tags: {
          schedulerSimulator: 'Simulador de escalonamento',
          nodeRuntime: 'Runtime Node.js',
          xtermWebPort: 'Port web xterm.js',
          preemptiveScheduling: 'Escalonamento preemptivo',
        },
      },
    },
    notFound: {
      title: 'Pagina Nao Encontrada',
      message: 'O terminal que voce procura nao esta nesta rota.',
      backHome: 'Voltar ao Inicio',
    },
  },
}
