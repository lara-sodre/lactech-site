function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.classList.remove('active');
  });

  var screen = document.getElementById(id);

  if (screen) {
    screen.classList.add('active');
  }

  window.scrollTo(0, 0);
}


function goToLogin() {
  showScreen('screen-login');
}


function goToCadastro() {
  currentStep = 1;
  renderStep();
  showScreen('screen-cadastro');
}


function goToCadastroFamilia() {
  limparCadastroFamilia();
  showScreen('screen-cadastro-familia');
}


function goToLoginEquipe() {
  showScreen('screen-login-equipe');
}


function goToLoginApoio() {
  showScreen('screen-login-apoio');
}


function goToPerfilNutriz() {
  showScreen('screen-perfil-nutriz');
}


function goToPerfilApoio() {
  showScreen('screen-perfil-apoio');
}


function goToDashboards() {
  showScreen('screen-dashboards');
}


var EQUIPE_CREDENCIAIS = [
  {
    usuario: 'equipe_lactare',
    senha: 'Lactare@2026'
  }
];


var APOIO_CREDENCIAIS = [
  {
    usuario: 'apoio_lactare',
    senha: 'Apoio@2026'
  }
];


var DOADORA_CREDENCIAIS =
  JSON.parse(localStorage.getItem('lactare_doadoras') || '[]');


var FAMILIA_CREDENCIAIS =
  JSON.parse(localStorage.getItem('lactare_familias') || '[]');


function salvarDoadoras() {
  localStorage.setItem(
    'lactare_doadoras',
    JSON.stringify(DOADORA_CREDENCIAIS)
  );
}


function salvarFamilias() {
  localStorage.setItem(
    'lactare_familias',
    JSON.stringify(FAMILIA_CREDENCIAIS)
  );
}


function checarCredencial(lista, usuario, senha) {
  usuario = (usuario || '').trim().toLowerCase();
  senha = senha || '';

  for (var i = 0; i < lista.length; i++) {
    if (
      lista[i].usuario.toLowerCase() === usuario &&
      lista[i].senha === senha
    ) {
      return true;
    }
  }

  return false;
}


function usuarioExiste(lista, usuario) {
  usuario = (usuario || '').trim().toLowerCase();

  for (var i = 0; i < lista.length; i++) {
    if (lista[i].usuario.toLowerCase() === usuario) {
      return true;
    }
  }

  return false;
}


function loginDoadora() {
  var user = document.getElementById('doadora-user');
  var pass = document.getElementById('doadora-pass');
  var erro = document.getElementById('doadora-login-error');

  if (
    user &&
    pass &&
    checarCredencial(
      DOADORA_CREDENCIAIS,
      user.value,
      pass.value
    )
  ) {
    if (erro) {
      erro.hidden = true;
    }

    goToPerfilNutriz();

    return;
  }

  if (erro) {
    erro.hidden = false;
  }
}


function loginFamilia() {
  var user = document.getElementById('familia-user');
  var pass = document.getElementById('familia-pass');
  var erro = document.getElementById('familia-login-error');

  if (
    user &&
    pass &&
    checarCredencial(
      FAMILIA_CREDENCIAIS,
      user.value,
      pass.value
    )
  ) {
    if (erro) {
      erro.hidden = true;
    }

    goToPerfilApoio();

    return;
  }

  if (erro) {
    erro.hidden = false;
  }
}


function loginEquipe() {
  var user = document.getElementById('eq-user');
  var pass = document.getElementById('eq-pass');
  var erro = document.getElementById('eq-login-error');

  if (
    user &&
    pass &&
    checarCredencial(
      EQUIPE_CREDENCIAIS,
      user.value,
      pass.value
    )
  ) {
    if (erro) {
      erro.hidden = true;
    }

    goToDashboards();

    return;
  }

  if (erro) {
    erro.hidden = false;
  }
}


function loginApoio() {
  var user = document.getElementById('ap-user');
  var pass = document.getElementById('ap-pass');
  var erro = document.getElementById('ap-login-error');

  if (
    user &&
    pass &&
    checarCredencial(
      APOIO_CREDENCIAIS,
      user.value,
      pass.value
    )
  ) {
    if (erro) {
      erro.hidden = true;
    }

    goToPerfilApoio();

    return;
  }

  if (erro) {
    erro.hidden = false;
  }
}


document.addEventListener('input', function (e) {

  if (!e.target) {
    return;
  }


  if (
    e.target.id === 'doadora-user' ||
    e.target.id === 'doadora-pass'
  ) {
    var erroDoadora =
      document.getElementById('doadora-login-error');

    if (erroDoadora) {
      erroDoadora.hidden = true;
    }
  }


  if (
    e.target.id === 'familia-user' ||
    e.target.id === 'familia-pass'
  ) {
    var erroFamilia =
      document.getElementById('familia-login-error');

    if (erroFamilia) {
      erroFamilia.hidden = true;
    }
  }


  if (
    e.target.id === 'eq-user' ||
    e.target.id === 'eq-pass'
  ) {
    var erroEquipe =
      document.getElementById('eq-login-error');

    if (erroEquipe) {
      erroEquipe.hidden = true;
    }
  }


  if (
    e.target.id === 'ap-user' ||
    e.target.id === 'ap-pass'
  ) {
    var erroApoio =
      document.getElementById('ap-login-error');

    if (erroApoio) {
      erroApoio.hidden = true;
    }
  }

});

var currentStep = 1;
var totalSteps = 4;


function renderStep() {

  document.querySelectorAll('.step').forEach(function (el) {

    var n =
      parseInt(
        el.getAttribute('data-step'),
        10
      );

    el.classList.remove(
      'current',
      'done'
    );

    if (n < currentStep) {
      el.classList.add('done');
    }

    if (n === currentStep) {
      el.classList.add('current');
    }

  });


  document.querySelectorAll('.wizard-panel').forEach(function (el) {

    var n =
      parseInt(
        el.getAttribute('data-panel'),
        10
      );

    el.hidden =
      n !== currentStep;

  });


  var backBtn =
    document.getElementById('btn-back-1');

  if (backBtn) {
    backBtn.disabled =
      currentStep === 1;
  }


  var card =
    document.querySelector(
      '#screen-cadastro .wizard-card'
    );

  if (
    card &&
    document.getElementById('screen-cadastro').classList.contains('active')
  ) {
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

}


function getPanel(step) {

  return document.querySelector(
    '.wizard-panel[data-panel="' + step + '"]'
  );

}


function clearStepErrors(panel) {

  panel
    .querySelectorAll('.invalid')
    .forEach(function (el) {
      el.classList.remove('invalid');
    });


  panel
    .querySelectorAll('.field-error')
    .forEach(function (el) {
      el.remove();
    });


  var banner =
    panel.querySelector(
      '.step-error-banner'
    );

  if (banner) {
    banner.remove();
  }

}


function markInvalid(el, message) {

  var wrapper =
    el.closest('.field') ||
    el.closest('.check-line');

  if (!wrapper) {
    return;
  }


  wrapper.classList.add('invalid');


  if (message) {

    var msg =
      document.createElement('div');

    msg.className =
      'field-error';

    msg.textContent =
      message;

    wrapper.appendChild(msg);

  }

}


function showStepErrorBanner(panel) {

  if (
    panel.querySelector(
      '.step-error-banner'
    )
  ) {
    return;
  }


  var banner =
    document.createElement('div');

  banner.className =
    'step-error-banner';

  banner.textContent =
    'Preencha corretamente os campos destacados antes de continuar.';


  var body =
    panel.querySelector('.wizard-body');

  body.insertBefore(
    banner,
    body.firstChild
  );

}


function validateStep(step) {

  var panel =
    getPanel(step);

  if (!panel) {
    return true;
  }


  clearStepErrors(panel);


  var valid = true;
  var firstInvalid = null;


  panel
    .querySelectorAll('[required]')
    .forEach(function (el) {

      var ok;


      if (el.type === 'checkbox') {
        ok = el.checked;
      } else {
        ok =
          el.value.trim() !== '';
      }


      if (!ok) {

        valid = false;

        markInvalid(el);

        if (!firstInvalid) {
          firstInvalid = el;
        }

      }

    });


  if (step === 1) {

    var cpf =
      panel.querySelector(
        '#dados-cpf'
      );


    if (
      cpf &&
      cpf.value.trim() !== ''
    ) {

      var cpfDigits =
        cpf.value.replace(
          /\D/g,
          ''
        );


      if (cpfDigits.length !== 11) {

        valid = false;

        markInvalid(
          cpf,
          'O CPF deve ter 11 números.'
        );


        if (!firstInvalid) {
          firstInvalid = cpf;
        }

      }

    }

  }


  if (step === 3) {

    var email =
      panel.querySelector(
        '#acesso-email'
      );


    var emailConfirm =
      panel.querySelector(
        '#acesso-email-confirm'
      );


    var senha =
      panel.querySelector(
        '#acesso-senha'
      );


    var senhaConfirm =
      panel.querySelector(
        '#acesso-senha-confirm'
      );


    var usuario =
      panel.querySelector(
        '#acesso-usuario'
      );


    var emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      email &&
      email.value.trim() !== '' &&
      !emailRegex.test(
        email.value.trim()
      )
    ) {

      valid = false;

      markInvalid(
        email,
        'Informe um e-mail válido.'
      );


      if (!firstInvalid) {
        firstInvalid = email;
      }

    }


    if (
      email &&
      emailConfirm &&
      email.value.trim() !== '' &&
      emailConfirm.value.trim() !== '' &&
      email.value.trim().toLowerCase() !==
      emailConfirm.value.trim().toLowerCase()
    ) {

      valid = false;

      markInvalid(
        emailConfirm,
        'Os e-mails não coincidem.'
      );


      if (!firstInvalid) {
        firstInvalid =
          emailConfirm;
      }

    }


    if (
      senha &&
      senhaConfirm &&
      senha.value !== '' &&
      senhaConfirm.value !== '' &&
      senha.value !== senhaConfirm.value
    ) {

      valid = false;

      markInvalid(
        senhaConfirm,
        'As senhas não coincidem.'
      );


      if (!firstInvalid) {
        firstInvalid =
          senhaConfirm;
      }

    }


    if (
      usuario &&
      usuario.value.trim() !== '' &&
      usuarioExiste(
        DOADORA_CREDENCIAIS,
        usuario.value
      )
    ) {

      valid = false;

      markInvalid(
        usuario,
        'Este nome de usuário já está cadastrado.'
      );


      if (!firstInvalid) {
        firstInvalid =
          usuario;
      }

    }

  }


  if (!valid) {

    showStepErrorBanner(panel);

    if (firstInvalid) {
      firstInvalid.focus();
    }

  }


  return valid;

}


document.addEventListener(
  'input',
  function (e) {

    var field =
      e.target.closest &&
      e.target.closest(
        '.field.invalid, .check-line.invalid'
      );


    if (field) {
      field.classList.remove('invalid');
    }

  }
);


document.addEventListener(
  'change',
  function (e) {

    var field =
      e.target.closest &&
      e.target.closest(
        '.field.invalid, .check-line.invalid'
      );


    if (field) {
      field.classList.remove('invalid');
    }

  }
);


function nextStep() {

  if (currentStep < totalSteps) {

    if (!validateStep(currentStep)) {
      return;
    }

    currentStep++;

    renderStep();

  }

}


function prevStep() {

  if (currentStep > 1) {

    currentStep--;

    renderStep();

  }

}


function finishCadastro() {

  if (!validateStep(currentStep)) {
    return;
  }


  var usuario =
    document.getElementById(
      'acesso-usuario'
    );


  var senha =
    document.getElementById(
      'acesso-senha'
    );


  var email =
    document.getElementById(
      'acesso-email'
    );


  if (
    !usuario ||
    !senha ||
    !email
  ) {
    return;
  }


  var usuarioValor =
    usuario.value.trim();


  var senhaValor =
    senha.value;


  var emailValor =
    email.value.trim();


  if (
    usuarioValor === '' ||
    senhaValor === '' ||
    emailValor === ''
  ) {
    return;
  }


  if (
    usuarioExiste(
      DOADORA_CREDENCIAIS,
      usuarioValor
    )
  ) {
    return;
  }


  DOADORA_CREDENCIAIS.push({
    usuario: usuarioValor,
    senha: senhaValor,
    email: emailValor
  });


  salvarDoadoras();


  var resumoUsuario =
    document.getElementById(
      'resumo-usuario'
    );


  var resumoEmail =
    document.getElementById(
      'resumo-email'
    );


  var resumoNome =
    document.getElementById(
      'resumo-nome'
    );


  var nome =
    document.getElementById(
      'dados-nome'
    );


  if (resumoUsuario) {
    resumoUsuario.textContent =
      usuarioValor;
  }


  if (resumoEmail) {
    resumoEmail.textContent =
      emailValor;
  }


  if (
    resumoNome &&
    nome
  ) {
    resumoNome.textContent =
      nome.value.trim();
  }


  showScreen(
    'screen-sucesso'
  );

}


function finalizarCadastroFamilia() {

  var nome =
    document.getElementById(
      'familia-nome'
    );


  var telefone =
    document.getElementById(
      'familia-telefone'
    );


  var email =
    document.getElementById(
      'familia-email'
    );


  var usuario =
    document.getElementById(
      'familia-novo-user'
    );


  var senha =
    document.getElementById(
      'familia-nova-senha'
    );


  var confirmarSenha =
    document.getElementById(
      'familia-confirma-senha'
    );


  var erro =
    document.getElementById(
      'familia-cadastro-error'
    );


  if (
    !nome.value.trim() ||
    !telefone.value.trim() ||
    !email.value.trim() ||
    !usuario.value.trim() ||
    !senha.value ||
    !confirmarSenha.value
  ) {

    erro.hidden = false;

    erro.textContent =
      'Preencha todos os campos.';

    return;

  }


  var emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (
    !emailRegex.test(
      email.value.trim()
    )
  ) {

    erro.hidden = false;

    erro.textContent =
      'Informe um e-mail válido.';

    return;

  }


  if (
    senha.value !==
    confirmarSenha.value
  ) {

    erro.hidden = false;

    erro.textContent =
      'As senhas não coincidem.';

    return;

  }


  if (
    usuarioExiste(
      FAMILIA_CREDENCIAIS,
      usuario.value
    )
  ) {

    erro.hidden = false;

    erro.textContent =
      'Este nome de usuário já está cadastrado.';

    return;

  }


  FAMILIA_CREDENCIAIS.push({

    usuario:
      usuario.value.trim(),

    senha:
      senha.value,

    nome:
      nome.value.trim(),

    telefone:
      telefone.value.trim(),

    email:
      email.value.trim()

  });


  salvarFamilias();


  erro.hidden = true;


  var loginUsuario =
    document.getElementById(
      'familia-user'
    );


  if (loginUsuario) {

    loginUsuario.value =
      usuario.value.trim();

  }


  var loginSenha =
    document.getElementById(
      'familia-pass'
    );


  if (loginSenha) {

    loginSenha.value = '';

  }


  alert(
    'Cadastro realizado com sucesso!'
  );


  goToLoginApoio();

}


function limparCadastroFamilia() {

  var campos = [
    'familia-nome',
    'familia-telefone',
    'familia-email',
    'familia-novo-user',
    'familia-nova-senha',
    'familia-confirma-senha'
  ];


  campos.forEach(function (id) {

    var campo =
      document.getElementById(id);

    if (campo) {
      campo.value = '';
    }

  });


  var erro =
    document.getElementById(
      'familia-cadastro-error'
    );


  if (erro) {
    erro.hidden = true;
  }

}


document.addEventListener(
  'DOMContentLoaded',
  function () {

    goToLogin();


    if (
      document.getElementById(
        'stepper'
      )
    ) {
      renderStep();
    }


    buildCalendar(
      'calRegistro',
      25,
      [6, 13, 20, 28]
    );


    buildCalendar(
      'calAgendaNutriz',
      25,
      [6, 13, 20, 28]
    );


    buildCalendar(
      'calApoio',
      25,
      [6, 13, 20, 28]
    );


    var monthsData = [
      38,
      30,
      42,
      35,
      50,
      55,
      48,
      64,
      58,
      45,
      33,
      25
    ];


    var yearsData = [
      1024,
      1180,
      1350,
      1520,
      1700,
      1890,
      2050,
      2230,
      2410,
      2600,
      3012,
      2780
    ];


    drawBars(
      'barColetaMes',
      monthsData,
      7
    );


    drawBars(
      'barColetaAno',
      yearsData,
      10
    );


    drawBars(
      'barDoadorasMes',
      monthsData,
      7
    );


    drawBars(
      'barDoadorasAno',
      yearsData,
      10
    );


    drawBars(
      'barFamiliasMes',
      monthsData,
      7
    );


    drawBars(
      'barFamiliasAno',
      yearsData,
      10
    );


    drawBars(
      'barImpactoMes',
      monthsData,
      7
    );


    drawBars(
      'barImpactoAno',
      yearsData,
      10
    );

  }
);


var nutrizGreetings = {

  jornada: [
    "Olá, Maria! Seja bem-vinda à família Lactare",
    "Cada doação sua protege uma vida. Veja seu histórico completo aqui."
  ],

  historico: [
    "Histórico de doações",
    "Cada doação sua protege uma vida. Veja seu histórico completo aqui."
  ],

  registro: [
    "Registro de coleta",
    "Quando tiver realizado uma coleta, nos avise. Buscamos no seu endereço com todo o cuidado."
  ],

  agendamento: [
    "Agendamento",
    "Agende uma consulta sempre que precisar, nossa equipe faz a triagem e garante o melhor atendimento."
  ],

  notificacoes: [
    "Notificações",
    "Acompanhe tudo que acontece por aqui."
  ],

  dados: [
    "Meus dados",
    "Suas informações cadastradas conosco."
  ],

  feedback: [
    "Feedback",
    "Conta pra gente como foi sua experiência. Seu feedback nos ajuda a melhorar a cada dia."
  ]

};


function showNutrizTab(
  tab,
  linkEl
) {

  document
    .querySelectorAll(
      '#nutrizMenu a'
    )
    .forEach(function (a) {

      a.classList.remove(
        'active'
      );

    });


  linkEl.classList.add(
    'active'
  );


  var scope =
    linkEl.closest(
      '.app-shell'
    );


  scope
    .querySelectorAll(
      '.panel-tab'
    )
    .forEach(function (p) {

      p.classList.remove(
        'active'
      );

    });


  scope
    .querySelector(
      '.panel-tab[data-panel-tab="' +
      tab +
      '"]'
    )
    .classList.add(
      'active'
    );


  var g =
    nutrizGreetings[tab];


  document.getElementById(
    'nutrizGreetingTitle'
  ).textContent =
    g[0];


  document.getElementById(
    'nutrizGreetingSub'
  ).textContent =
    g[1];

}


var apoioGreetings = {

  suporte: [
    "Essa jornada tem seus desafios, e você não precisa enfrentá-los sozinha.",
    "A Lactare oferece suporte técnico e emocional gratuito durante e depois da amamentação."
  ],

  agendamento: [
    "Agendamento",
    "Agende uma consulta sempre que precisar, nossa equipe fará o possível para te ajudar."
  ],

  historico: [
    "Histórico de consultas",
    "Cada consulta é registrada para você acompanhar seu atendimento."
  ],

  feedback: [
    "Feedback",
    "Conta pra gente como foi sua experiência. Seu feedback nos ajuda a melhorar a cada dia."
  ],

  notificacoes: [
    "Notificações",
    "Acompanhe tudo que acontece por aqui."
  ],

  dados: [
    "Meus dados",
    "Suas informações cadastradas conosco."
  ]

};


function showApoioTab(
  tab,
  linkEl
) {

  document
    .querySelectorAll(
      '#apoioMenu a'
    )
    .forEach(function (a) {

      a.classList.remove(
        'active'
      );

    });


  linkEl.classList.add(
    'active'
  );


  var scope =
    linkEl.closest(
      '.app-shell'
    );


  scope
    .querySelectorAll(
      '.panel-tab'
    )
    .forEach(function (p) {

      p.classList.remove(
        'active'
      );

    });


  scope
    .querySelector(
      '.panel-tab[data-panel-tab="' +
      tab +
      '"]'
    )
    .classList.add(
      'active'
    );


  var g =
    apoioGreetings[tab];


  document.getElementById(
    'apoioGreetingTitle'
  ).textContent =
    g[0];


  document.getElementById(
    'apoioGreetingSub'
  ).textContent =
    g[1];

}


function showDashTab(
  tab,
  linkEl
) {

  document
    .querySelectorAll(
      '#dashMenu a'
    )
    .forEach(function (a) {

      a.classList.remove(
        'active'
      );

    });


  linkEl.classList.add(
    'active'
  );


  document
    .querySelectorAll(
      '.dash-tab'
    )
    .forEach(function (p) {

      p.classList.remove(
        'active'
      );

    });


  var panel =
    document.querySelector(
      '.dash-tab[data-dashpanel="' +
      tab +
      '"]'
    );


  if (panel) {
    panel.classList.add(
      'active'
    );
  }

}


function drawBars(
  elId,
  values,
  highlightIndex
) {

  var el =
    document.getElementById(
      elId
    );


  if (!el) {
    return;
  }


  var max =
    Math.max.apply(
      null,
      values
    );


  el.innerHTML =
    values
      .map(function (v, i) {

        var h =
          Math.max(
            6,
            Math.round(
              (v / max) * 100
            )
          );


        var bg =
          i === highlightIndex
            ? 'background:#3aa87f;'
            : '';


        return (
          '<div class="bar" style="height:' +
          h +
          '%;' +
          bg +
          '"></div>'
        );

      })
      .join('');

}


function buildCalendar(
  elId,
  selectedDay,
  availableDays
) {

  var el =
    document.getElementById(
      elId
    );


  if (!el) {
    return;
  }


  var days = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S"
  ];


  var html =
    "<table><thead><tr>" +
    days
      .map(function (d) {
        return "<th>" +
          d +
          "</th>";
      })
      .join("") +
    "</tr></thead><tbody>";


  var firstDayOffset = 4;
  var totalDays = 31;
  var day = 1;


  for (
    var row = 0;
    row < 6;
    row++
  ) {

    html += "<tr>";


    for (
      var col = 0;
      col < 7;
      col++
    ) {

      if (
        (
          row === 0 &&
          col < firstDayOffset
        ) ||
        day > totalDays
      ) {

        html +=
          "<td><div class='day empty'></div></td>";

      } else {

        var cls = "day";


        if (
          day === selectedDay
        ) {

          cls +=
            " selected";

        } else if (
          availableDays.indexOf(
            day
          ) !== -1
        ) {

          cls +=
            " available";

        }


        html +=
          "<td><div class='" +
          cls +
          "'>" +
          day +
          "</div></td>";


        day++;

      }

    }


    html += "</tr>";


    if (
      day > totalDays
    ) {
      break;
    }

  }


  html +=
    "</tbody></table>";


  el.innerHTML =
    html;

}