export const locales = ['en', 'pt-BR'] as const

export type Locale = typeof locales[number]

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
    intro: string
    brandPanelLabel: string
    brandPanelCopy: string
    mattediWorksLogoAlt: string
    consoleAdventureCta: string
    rtsimCta: string
    consoleAdventureDescription: string
    rtsimDescription: string
  }
  consoleAdventure: {
    title: string
    widthWarning: string
    description: string
    sourceLabel: string
    sourceAria: string
    screenshotAlt: string
  }
  rtsim: {
    title: string
    sourceLabel: string
    sourceAria: string
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
      intro: 'These are console applications built for Node.js and ported to run in the browser with xterm.js.',
      brandPanelLabel: 'MattediWorks brand',
      brandPanelCopy: 'A compact systems catalog for terminal tools, browser ports, and automation experiments.',
      mattediWorksLogoAlt: 'MattediWorks logo',
      consoleAdventureCta: 'Play Console Adventure',
      rtsimCta: 'Scheduler Simulator',
      consoleAdventureDescription: 'Turn-based RPG where you explore a world full of adventures and challenges.',
      rtsimDescription: 'Discrete-time preemptive scheduler simulator that shows how scheduling algorithms work.',
    },
    consoleAdventure: {
      title: 'Console Adventure',
      widthWarning: 'You need at least 1040 px of width to see the terminal.',
      description:
        'Console Adventure began as an object-oriented programming project for my Software Engineering course. I kept expanding it into a fuller terminal game, then ported it to the web with xterm.js and React so you can play it in the browser.',
      sourceLabel: 'Source: vtmattedi/ConsoleAdventure',
      sourceAria: 'Open Console Adventure source on GitHub',
      screenshotAlt: 'Console Adventure screenshot',
    },
    rtsim: {
      title: 'RTSim',
      sourceLabel: 'Source: vtmattedi/rtsim',
      sourceAria: 'Open RTSim source on GitHub',
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
      intro: 'Estes sao aplicativos de console criados para Node.js e portados para rodar no navegador com xterm.js.',
      brandPanelLabel: 'Marca MattediWorks',
      brandPanelCopy: 'Um catalogo compacto de sistemas para ferramentas de terminal, ports no navegador e experimentos de automacao.',
      mattediWorksLogoAlt: 'Logo MattediWorks',
      consoleAdventureCta: 'Jogar Console Adventure',
      rtsimCta: 'Simulador Escalonador',
      consoleAdventureDescription: 'RPG em turnos para explorar um mundo cheio de aventuras e desafios.',
      rtsimDescription: 'Simulador de escalonamento preemptivo em tempo discreto que mostra algoritmos em funcionamento.',
    },
    consoleAdventure: {
      title: 'Console Adventure',
      widthWarning: 'Voce precisa de pelo menos 1040 px de largura para ver o terminal.',
      description:
        'Console Adventure comecou como um projeto de programacao orientada a objetos no meu curso de Engenharia de Software. Continuei expandindo o jogo de terminal e depois fiz o port para a web com xterm.js e React para que voce possa jogar no navegador.',
      sourceLabel: 'Codigo: vtmattedi/ConsoleAdventure',
      sourceAria: 'Abrir codigo do Console Adventure no GitHub',
      screenshotAlt: 'Captura de tela do Console Adventure',
    },
    rtsim: {
      title: 'RTSim',
      sourceLabel: 'Codigo: vtmattedi/rtsim',
      sourceAria: 'Abrir codigo do RTSim no GitHub',
    },
    notFound: {
      title: 'Pagina Nao Encontrada',
      message: 'O terminal que voce procura nao esta nesta rota.',
      backHome: 'Voltar ao Inicio',
    },
  },
}
