export const scenarios = [
    {
        id: 'bank_scam',
        type: 'scam',
        isScam: true,
        title: 'Oferta de Alto Interés de Bank of America',
        description: 'Recibes una oferta exclusiva para una cuenta de ahorros de alto rendimiento.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'Bank of America <promo@bank-of-america-secure-offers.com>',
                    subject: 'Exclusivo: Cuenta de Ahorros con 10% APY',
                    body: 'Estimado Cliente Valioso, Ha sido seleccionado para nuestra cuenta de ahorros Nivel Diamante con un 10% APY garantizado. Esta oferta expira en 48 horas. Vincule su cuenta actual ahora para transferir fondos y asegurar esta tasa.'
                },
                options: [
                    { label: 'Hacer clic en el enlace para reclamar la oferta', next: 'fake_site', outcome: 'neutral' },
                    { label: 'Verificar la dirección de correo del remitente', next: 'inspect_sender', outcome: 'neutral' },
                    { label: 'Responder y pedir más detalles', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'Iniciar sesión en tu app bancaria real para verificar', next: 'safe_check', outcome: 'safe' }
                ]
            },
            inspect_sender: {
                content: {
                    type: 'info',
                    text: 'Pasas el cursor sobre el nombre del remitente. La dirección es "promo@bank-of-america-secure-offers.com". Los correos reales de Bank of America generalmente vienen de "@bankofamerica.com" o "@emcom.bankofamerica.com".'
                },
                options: [
                    { label: 'Dice "Bank of America" así que debe ser real. Hacer clic.', next: 'fake_site', outcome: 'neutral' },
                    { label: 'Buscar en Google el dominio "bank-of-america-secure-offers.com"', next: 'google_domain', outcome: 'neutral' },
                    { label: 'Marcar como Spam y Eliminar', next: 'safe_end', outcome: 'safe' },
                    { label: 'Reenviar a un amigo para preguntar', next: 'friend_advice', outcome: 'neutral' }
                ]
            },
            friend_advice: {
                content: {
                    type: 'info',
                    text: 'Tu amigo dice: "Eso parece súper falso. 10% APY es imposible ahora mismo. ¡Y mira esa dirección de correo!"'
                },
                options: [
                    { label: 'Tienes razón. Eliminarlo.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Haré clic solo para ver.', next: 'fake_site', outcome: 'neutral' },
                    { label: 'Responderles para estar seguro.', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'Ignorar al amigo, quiero el dinero.', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            google_domain: {
                content: {
                    type: 'web',
                    url: 'www.google.com',
                    headline: 'Resultados de Búsqueda',
                    body: 'No se encontraron resultados oficiales para "bank-of-america-secure-offers.com". Varios foros discuten "estafas de dominios bancarios falsos".'
                },
                options: [
                    { label: 'Ignorar los resultados, 10% es demasiado bueno para perdérselo.', next: 'fake_site', outcome: 'neutral' },
                    { label: 'Cerrar el correo inmediatamente.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Responder al correo preguntando si son legítimos.', next: 'reply_scammer', outcome: 'neutral' },
                    { label: 'Hacer clic en el enlace solo para ver cómo se ve.', next: 'fake_site', outcome: 'neutral' }
                ]
            },
            reply_scammer: {
                content: {
                    type: 'email',
                    sender: 'Soporte Bank of America <support@bank-of-america-secure-offers.com>',
                    subject: 'Re: Exclusivo: Cuenta de Ahorros con 10% APY',
                    body: 'Sí, esta es una oferta legítima por tiempo limitado para nuestros mejores clientes. No podemos reservar este lugar por mucho tiempo. Por favor complete el registro inmediatamente o daremos el lugar a otro cliente.'
                },
                options: [
                    { label: 'Está bien, me registraré ahora.', next: 'fake_site', outcome: 'neutral' },
                    { label: '¿Por qué hay tanta presión?', next: 'pressure_response', outcome: 'neutral' },
                    { label: 'Llamar al número en la firma del correo', next: 'fake_call', outcome: 'neutral' },
                    { label: 'Dejar de responder.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            pressure_response: {
                content: {
                    type: 'email',
                    sender: 'Soporte Bank of America',
                    body: 'Tenemos alta demanda. Si no desea la oferta, por favor avísenos para dársela a la siguiente persona en la lista de espera. Le queda 1 hora.'
                },
                options: [
                    { label: 'No quiero perdérmelo. Registrarme.', next: 'fake_site', outcome: 'neutral' },
                    { label: 'Esto es poco profesional. Bloquear.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Llamarlos.', next: 'fake_call', outcome: 'neutral' },
                    { label: 'Verificar en la app real.', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_call: {
                content: {
                    type: 'phone',
                    caller: 'Soporte Bancario (Falso)',
                    audio_text: '"Departamento de Ofertas Seguras de Bank of America. Por favor proporcione su número de cuenta para verificar su elegibilidad."'
                },
                options: [
                    { label: 'Dar número de cuenta', next: 'fail_login', outcome: 'fail' },
                    { label: 'Colgar.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Pedir su nombre e ID', next: 'pressure_response', outcome: 'neutral' },
                    { label: 'Decir "Iré a una sucursal".', next: 'safe_check', outcome: 'safe' }
                ]
            },
            fake_site: {
                content: {
                    type: 'web',
                    url: 'www.bank-of-america-secure-offers.com/login',
                    headline: 'Bank of America - Inicio de Sesión Seguro',
                    body: 'Por favor inicie sesión con su ID en línea y contraseña para reclamar su oferta de 10% APY.',
                    input: 'Campos de usuario/contraseña visibles'
                },
                options: [
                    { label: 'Ingresar tu usuario y contraseña', next: 'fail_login', outcome: 'fail' },
                    { label: 'Hacer clic en "Olvidé mi contraseña" para probarlo', next: 'broken_link', outcome: 'neutral' },
                    { label: 'Verificar la barra de URL cuidadosamente', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'Cerrar la pestaña', next: 'safe_end', outcome: 'safe' }
                ]
            },
            broken_link: {
                content: {
                    type: 'info',
                    text: 'Haces clic en "Olvidé mi contraseña" pero no pasa nada. O simplemente recarga la página. Los sitios reales tienen enlaces funcionales.'
                },
                options: [
                    { label: 'Debe ser un error. Iniciar sesión de todos modos.', next: 'fail_login', outcome: 'fail' },
                    { label: '¡Sitio falso! Cerrarlo.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Probar otro enlace.', next: 'inspect_url', outcome: 'neutral' },
                    { label: 'Reportar phishing.', next: 'safe_report', outcome: 'safe' }
                ]
            },
            inspect_url: {
                content: {
                    type: 'info',
                    text: 'La URL es "bank-of-america-secure-offers.com". Hay un ícono de candado, pero eso solo significa que la conexión está encriptada, no que el sitio sea real.'
                },
                options: [
                    { label: 'Tiene candado, es seguro. Iniciar sesión.', next: 'fail_login', outcome: 'fail' },
                    { label: 'Este no es el sitio real. Cerrarlo.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Ingresar datos falsos para molestarlos', next: 'troll_scammer', outcome: 'neutral' },
                    { label: 'Tomar captura de pantalla y reportar', next: 'safe_report', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'Ingresas "Usuario: FakeUser" y "Contraseña: 12345". El sitio los acepta y pide tu SSN. Claramente no valida credenciales.'
                },
                options: [
                    { label: 'Cerrar la pestaña inmediatamente.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Ingresar SSN falso también.', next: 'safe_report', outcome: 'safe' },
                    { label: 'Espera, ¿debería usar información real?', next: 'fail_login', outcome: 'fail' },
                    { label: 'Reírme e irme.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            safe_report: {
                isEnd: true,
                success: true,
                message: 'Reportaste la estafa.',
                feedback: 'Tomar una captura de pantalla y reportarla al banco real les ayuda a eliminar el sitio falso. ¡Buen trabajo!'
            },
            fail_login: {
                isEnd: true,
                success: false,
                message: 'Entregaste tus credenciales bancarias.',
                feedback: 'Ingresaste tu usuario y contraseña reales en un sitio falso. Los estafadores ahora tienen acceso completo a tu cuenta bancaria.'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: 'Ignoraste la estafa de forma segura.',
                feedback: 'Reconocer el dominio falso y la oferta "demasiado buena para ser verdad" te salvó. Los bancos reales no te presionan con plazos de 48 horas por correo.'
            },
            safe_check: {
                isEnd: true,
                success: true,
                message: 'Verificaste a través de un canal confiable.',
                feedback: 'Excelente. Siempre ve a la app o sitio web oficial tú mismo. Habrías visto que no existe tal oferta.'
            }
        }
    },
    {
        id: 'social_security',
        type: 'scam',
        isScam: true,
        title: 'Urgente: Suspensión del Seguro Social',
        description: 'Recibes una llamada que afirma que tu número de Seguro Social ha sido marcado.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'Administración del Seguro Social (1-800-772-1213)',
                    audio_text: '"Esta es la Administración del Seguro Social. Su número de Seguro Social ha sido marcado por actividad sospechosa. Llame inmediatamente para evitar la suspensión de su cuenta."'
                },
                options: [
                    { label: 'Pedir ID de empleado y número de devolución de llamada', next: 'ask_id', outcome: 'neutral' },
                    { label: 'Proporcionar SSN para confirmar identidad', next: 'fail_ssn', outcome: 'fail' },
                    { label: 'Colgar y llamar al número oficial de la SSA', next: 'safe_official', outcome: 'safe' },
                    { label: 'Ignorar y bloquear el número', next: 'safe_ignore', outcome: 'safe' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'Oficial Roberts (Falso)',
                    audio_text: '"Mi número de placa es SSA-8921. Este es un asunto federal. Si no verifica ahora, emitiremos una orden de arresto."'
                },
                options: [
                    { label: 'Tengo miedo. Verificaré.', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'La SSA no amenaza con arresto. Colgar.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Pedir hablar con un supervisor', next: 'supervisor_fake', outcome: 'neutral' },
                    { label: 'Decirles que estás grabando la llamada', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            supervisor_fake: {
                content: {
                    type: 'phone',
                    caller: 'Supervisor (Falso)',
                    audio_text: '"Soy el Supervisor Smith. El Oficial Roberts tiene razón. Tenemos una orden. Debe verificar inmediatamente en nuestro portal seguro."'
                },
                options: [
                    { label: 'Está bien, verificaré.', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'Esto suena ensayado. Colgar.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Pedir el número de la orden.', next: 'fake_verification', outcome: 'neutral' },
                    { label: 'Rechazar.', next: 'scammer_hangup', outcome: 'safe' }
                ]
            },
            scammer_hangup: {
                isEnd: true,
                success: true,
                message: 'El estafador colgó.',
                feedback: 'Los estafadores odian ser grabados o cuestionados. Tan pronto como presionaste, supieron que no eras un blanco fácil.'
            },
            fake_verification: {
                content: {
                    type: 'web',
                    url: 'www.ssa-verify-secure-portal.com',
                    headline: 'Verificación del Seguro Social',
                    body: 'Por favor ingrese su número completo de Seguro Social para revocar la orden de arresto.',
                    input: 'Campo de SSN'
                },
                options: [
                    { label: 'Ingresar SSN', next: 'fail_ssn', outcome: 'fail' },
                    { label: 'Este sitio web parece falso. Cerrarlo.', next: 'safe_close', outcome: 'safe' },
                    { label: 'Ingresar números falsos', next: 'troll_scammer', outcome: 'neutral' },
                    { label: 'Llamar a la policía', next: 'safe_police', outcome: 'safe' }
                ]
            },
            troll_scammer: {
                content: {
                    type: 'info',
                    text: 'Ingresaste 000-00-0000. El sitio lo aceptó. Un sitio gubernamental real validaría esto.'
                },
                options: [
                    { label: 'Definitivamente es una estafa. Cerrar.', next: 'safe_close', outcome: 'safe' },
                    { label: 'Reportar el sitio.', next: 'safe_police', outcome: 'safe' },
                    { label: 'Seguir ingresando datos falsos.', next: 'safe_close', outcome: 'safe' },
                    { label: 'Espera, déjame poner el real.', next: 'fail_ssn', outcome: 'fail' }
                ]
            },
            safe_police: {
                isEnd: true,
                success: true,
                message: 'Contactaste a las autoridades.',
                feedback: 'Llamar a la policía local (no emergencia) o reportar a la FTC es lo correcto. Confirmaron que no existe ninguna orden.'
            },
            fail_ssn: {
                isEnd: true,
                success: false,
                message: 'Entregaste tu número de Seguro Social.',
                feedback: 'La SSA NUNCA llamará para amenazarte con arresto ni exigir tu SSN para "desbloquear" tu cuenta. El identificador de llamadas puede ser falsificado.'
            },
            safe_official: {
                isEnd: true,
                success: true,
                message: 'Llamaste a la SSA real.',
                feedback: 'Correcto. Siempre cuelga y busca el número oficial tú mismo (ssa.gov). La SSA real confirmó que no había ningún problema.'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: 'Colgaste a un estafador.',
                feedback: 'Buen trabajo. Las agencias gubernamentales envían cartas; no llaman para amenazar con arresto. El miedo es su arma principal.'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'Cerraste el sitio falso.',
                feedback: 'El sitio era una página de phishing diseñada para robar tu identidad. Cerrarlo fue la opción segura.'
            },
            safe_ignore: {
                isEnd: true,
                success: true,
                message: 'Ignoraste la llamada.',
                feedback: 'Si es importante, la SSA enviará una carta. Ignorar llamadas no solicitadas es una estrategia segura por defecto.'
            }
        }
    },
    {
        id: 'job_offer',
        type: 'scam',
        isScam: true,
        title: 'Trabajo Remoto de Entrada de Datos',
        description: 'Solicitaste un trabajo y obtuviste una respuesta inmediata.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'email',
                    sender: 'Gerente de Contratación <hr@global-logistics-inc.net>',
                    subject: 'Oferta de Trabajo: Especialista en Entrada de Datos Remoto - $35/hora',
                    body: 'Estamos impresionados con su currículum. Nos gustaría contratarlo inmediatamente. No se necesita entrevista. Necesitará una laptop e impresora. Le enviaremos un cheque para comprarlos de nuestro proveedor.'
                },
                options: [
                    { label: 'Aceptar el trabajo inmediatamente', next: 'accept_job', outcome: 'neutral' },
                    { label: 'Pedir una entrevista por video primero', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'Verificar el sitio web de la empresa', next: 'check_company', outcome: 'neutral' },
                    { label: 'Rechazar, suena sospechoso', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_company: {
                content: {
                    type: 'web',
                    url: 'www.global-logistics-inc.net',
                    headline: 'Global Logistics Inc.',
                    body: 'El sitio web se ve muy genérico. El texto "Sobre Nosotros" tiene errores ortográficos. La dirección listada es una casa residencial.'
                },
                options: [
                    { label: 'Parece bien, las startups son así.', next: 'accept_job', outcome: 'neutral' },
                    { label: 'Esta es una empresa falsa. Rechazar.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Preguntarles sobre la dirección.', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'Reportarlos.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            accept_job: {
                content: {
                    type: 'email',
                    sender: 'Gerente de Contratación',
                    body: 'Genial. Le estamos enviando un cheque por $2,500. Deposítelo por la app móvil, quédese con $500 de su primera semana y transfiera el resto a nuestro proveedor de equipos para enviar su laptop.'
                },
                options: [
                    { label: 'Depositar el cheque y transferir el dinero', next: 'fail_check', outcome: 'fail' },
                    { label: 'Esperar a que el cheque se acredite completamente', next: 'wait_clear', outcome: 'neutral' },
                    { label: 'Preguntar por qué no puedo comprarlo yo mismo', next: 'ask_why', outcome: 'neutral' },
                    { label: 'Esta es una estafa de cheque falso. Parar.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            wait_clear: {
                content: {
                    type: 'info',
                    text: 'Esperas. 3 días después, el banco retira los fondos y te cobra una tarifa. El cheque era falso. Menos mal que no enviaste el dinero.'
                },
                options: [
                    { label: 'Bloquear al estafador.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Reportar al banco.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Enviarles un correo enojado.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Intentar depositarlo de nuevo.', next: 'fail_check_bad', outcome: 'fail' }
                ]
            },
            ask_why: {
                content: {
                    type: 'email',
                    sender: 'Gerente de Contratación',
                    body: 'Nuestro proveedor configura la laptop con software propietario. Debe usar nuestro proveedor. Confíe en el proceso.'
                },
                options: [
                    { label: 'Está bien, lo haré.', next: 'fail_check', outcome: 'fail' },
                    { label: 'No, compraré el mío.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Esto no tiene sentido. Renunciar.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Pedir el nombre del proveedor.', next: 'check_company', outcome: 'neutral' }
                ]
            },
            ask_interview: {
                content: {
                    type: 'email',
                    sender: 'Gerente de Contratación',
                    body: 'Estamos muy ocupados y confiamos en su currículum. Solo nos comunicamos por texto en Telegram. Por favor descargue Telegram y agrégueme.'
                },
                options: [
                    { label: 'Descargar Telegram y agregarlos', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'Negarse a usar Telegram, pedir Zoom', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'Esto es poco profesional. Renunciar.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Buscar la dirección de la empresa', next: 'check_company', outcome: 'neutral' }
                ]
            },
            telegram_chat: {
                content: {
                    type: 'social',
                    platform: 'Telegram',
                    sender: 'Gerente de Contratación',
                    message: 'Bienvenido. Para empezar, necesito su nombre completo, dirección y datos bancarios para el depósito directo.'
                },
                options: [
                    { label: 'Dar datos.', next: 'fail_identity', outcome: 'fail' },
                    { label: 'Pedir contrato primero.', next: 'refuse_telegram', outcome: 'neutral' },
                    { label: 'Bloquear usuario.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Preguntar "¿Esto es una estafa?"', next: 'refuse_telegram', outcome: 'neutral' }
                ]
            },
            refuse_telegram: {
                content: {
                    type: 'email',
                    sender: 'Gerente de Contratación',
                    body: 'Si no puede seguir instrucciones simples, no es adecuado para este puesto. Oferta retirada.'
                },
                options: [
                    { label: 'Mejor así.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Rogar por el trabajo.', next: 'telegram_chat', outcome: 'neutral' },
                    { label: 'Reportar correo.', next: 'safe_decline', outcome: 'safe' },
                    { label: 'Responder "Eres un estafador".', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            check_address: {
                content: {
                    type: 'web',
                    url: 'Google Maps',
                    headline: 'Búsqueda de Dirección',
                    body: 'La dirección proporcionada corresponde a un terreno vacío o una casa residencial, no una oficina corporativa.'
                },
                options: [
                    { label: 'Eso es sospechoso. Rechazar.', next: 'safe_decline', outcome: 'safe' },
                    { label: '¿Tal vez trabajan desde casa?', next: 'accept_job', outcome: 'neutral' },
                    { label: 'Preguntarles al respecto.', next: 'ask_interview', outcome: 'neutral' },
                    { label: 'Ignorar.', next: 'safe_decline', outcome: 'safe' }
                ]
            },
            fail_check: {
                isEnd: true,
                success: false,
                message: 'Caíste en una estafa de cheque falso.',
                feedback: 'El cheque rebotará en unos días, pero el dinero que transferiste se fue para siempre. Las empresas legítimas nunca te envían cheques para comprar equipo.'
            },
            fail_check_bad: {
                isEnd: true,
                success: false,
                message: 'Depositaste un cheque malo dos veces.',
                feedback: 'Tu banco podría cerrar tu cuenta por actividad fraudulenta. Nunca fuerces un cheque que ha rebotado.'
            },
            fail_identity: {
                isEnd: true,
                success: false,
                message: 'Entregaste información personal sensible.',
                feedback: 'Proporcionar datos bancarios por Telegram a un extraño es peligroso. Pueden usar esto para robo de identidad.'
            },
            safe_decline: {
                isEnd: true,
                success: true,
                message: 'Evitaste un trabajo falso.',
                feedback: 'Buenos instintos. "Sin entrevista", "Solo Telegram" y "Te enviamos un cheque" son señales clásicas de una estafa de empleo.'
            }
        }
    },
    {
        id: 'tech_support',
        type: 'scam',
        isScam: true,
        title: 'Alerta de Virus Emergente',
        description: 'Una alarma fuerte comienza a sonar en tu computadora.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'popup',
                    header: 'ALERTA DE WINDOWS DEFENDER: VIRUS ZEUS DETECTADO',
                    body: 'Su computadora ha sido infectada. Se están robando datos. Llame al Soporte de Microsoft inmediatamente: 1-888-555-0192. No reinicie su computadora.',
                    audio: 'Sonido de pitido fuerte'
                },
                options: [
                    { label: 'Llamar al número inmediatamente', next: 'call_scammer', outcome: 'neutral' },
                    { label: 'Hacer clic en el botón "Escanear Ahora"', next: 'scan_fake', outcome: 'neutral' },
                    { label: 'Abrir el Administrador de Tareas para cerrar el navegador', next: 'safe_close', outcome: 'safe' },
                    { label: 'Desconectar el router de internet', next: 'safe_unplug', outcome: 'safe' }
                ]
            },
            scan_fake: {
                content: {
                    type: 'popup',
                    header: 'ESCANEANDO SISTEMA...',
                    body: 'Escaneando archivos... ¡128 Amenazas Encontradas! ¡Error Crítico! Su dirección IP está comprometida. Haga clic en "Eliminar Todo" para solucionar.',
                    timer: 'Escaneo completo.'
                },
                options: [
                    { label: 'Hacer clic en "Eliminar Todo"', next: 'fail_malware', outcome: 'fail' },
                    { label: 'Esto parece falso. Cerrar navegador.', next: 'safe_close', outcome: 'safe' },
                    { label: 'Llamar al número de soporte', next: 'call_scammer', outcome: 'neutral' },
                    { label: 'Ignorar y reiniciar', next: 'safe_close', outcome: 'safe' }
                ]
            },
            call_scammer: {
                content: {
                    type: 'phone',
                    caller: 'Soporte Microsoft (Falso)',
                    audio_text: '"Hola, este es Microsoft. Detectamos hackers en su red. Necesito conectarme remotamente para solucionarlo. Por favor descargue AnyDesk."'
                },
                options: [
                    { label: 'Descargar AnyDesk y dar acceso', next: 'fail_remote', outcome: 'fail' },
                    { label: 'Pedir su ID de empleado', next: 'ask_id', outcome: 'neutral' },
                    { label: 'Colgar. Microsoft no te llama.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Decirles que tienes un Mac', next: 'troll_mac', outcome: 'neutral' }
                ]
            },
            ask_id: {
                content: {
                    type: 'phone',
                    caller: 'Soporte Microsoft (Falso)',
                    audio_text: '"Mi ID es MS-9921. Mire, su computadora está a punto de fallar. ¿Quiere perder todas sus fotos? Conéctese ahora."'
                },
                options: [
                    { label: 'No quiero perder mis fotos. Conectar.', next: 'fail_remote', outcome: 'fail' },
                    { label: 'Estás mintiendo. Colgar.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Pedir supervisor.', next: 'call_scammer', outcome: 'neutral' },
                    { label: 'Decir "Llamaré al número oficial de Microsoft".', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            troll_mac: {
                content: {
                    type: 'phone',
                    caller: 'Soporte Microsoft (Falso)',
                    audio_text: '"(Silencio)... Eh, también damos soporte a Mac. Vaya a la App Store y descargue AnyDesk."'
                },
                options: [
                    { label: 'Antes dijiste Windows Defender.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Está bien, descargando.', next: 'fail_remote', outcome: 'fail' },
                    { label: 'Colgar.', next: 'safe_hangup', outcome: 'safe' },
                    { label: 'Seguir molestándolos.', next: 'safe_hangup', outcome: 'safe' }
                ]
            },
            safe_unplug: {
                isEnd: true,
                success: true,
                message: 'Desconectaste el internet.',
                feedback: 'Desconectar detiene cualquier transferencia de datos. Luego puedes reiniciar tu computadora de forma segura. La ventana emergente era solo una página del navegador.'
            },
            fail_remote: {
                isEnd: true,
                success: false,
                message: 'Le diste acceso remoto a un estafador.',
                feedback: 'Ahora robarán tus archivos, instalarán keyloggers o bloquearán tu computadora con ransomware. Nunca des acceso remoto a desconocidos que te llaman.'
            },
            fail_malware: {
                isEnd: true,
                success: false,
                message: 'Hiciste clic en un enlace malicioso.',
                feedback: 'Los botones falsos de "Eliminar Virus" a menudo descargan malware real. El antivirus real se ejecuta en su propia ventana, no en una ventana emergente del navegador.'
            },
            safe_close: {
                isEnd: true,
                success: true,
                message: 'Cerraste el popup de forma segura.',
                feedback: 'Correcto. Estos popups son solo páginas web en pantalla completa. Cerrar el navegador (Alt+F4 o Administrador de Tareas) resuelve el problema.'
            },
            safe_hangup: {
                isEnd: true,
                success: true,
                message: 'Le colgaste al estafador.',
                feedback: 'Bien. Microsoft nunca te llamará sin que lo pidas para reparar tu computadora.'
            }
        }
    },
    {
        id: 'social_legit',
        type: 'legit',
        isScam: false,
        title: '¿Amigo en Necesidad?',
        description: 'Recibes un mensaje directo de tu amiga Sarah en Instagram.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '¡Hola! ¿Estás libre ahora? Necesito un gran favor.'
                },
                options: [
                    { label: 'Claro, ¿qué necesitas?', next: 'ask_favor', outcome: 'neutral' },
                    { label: '¿De verdad eres Sarah?', next: 'verify_identity', outcome: 'neutral' },
                    { label: 'Ignorar, probablemente hackeada.', next: 'ignore_friend', outcome: 'safe' },
                    { label: 'Enviar mensaje a su número real para verificar', next: 'text_real', outcome: 'safe' }
                ]
            },
            ignore_friend: {
                isEnd: true,
                success: true,
                message: 'Ignoraste el mensaje.',
                feedback: 'Si sospechas que un amigo fue hackeado, ignorar es seguro. Mejor envíales un mensaje por otra plataforma para confirmar.'
            },
            ask_favor: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'Me bloquearon de mi otra cuenta y necesito que alguien reciba un código por mí. ¿Puedo enviarlo a tu teléfono?'
                },
                options: [
                    { label: 'Envíame el código', next: 'fail_2fa', outcome: 'fail' },
                    { label: 'Eso suena a estafa. No.', next: 'deny_request', outcome: 'safe' },
                    { label: 'Llamarla para que explique', next: 'call_sarah', outcome: 'safe' },
                    { label: 'Preguntar "¿Cómo se llama mi perro?"', next: 'security_question', outcome: 'neutral' }
                ]
            },
            deny_request: {
                isEnd: true,
                success: true,
                message: 'Te negaste a enviar el código.',
                feedback: 'Inteligente. Nunca compartas códigos de verificación enviados a tu teléfono, incluso si un "amigo" te lo pide.'
            },
            call_sarah: {
                isEnd: true,
                success: true,
                message: 'Llamaste a Sarah.',
                feedback: 'Contestó y explicó que realmente estaba bloqueada, pero entendió tu precaución. Llamar es la mejor verificación.'
            },
            security_question: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'Jaja, ¡es Buster! Vamos, de verdad necesito ayuda.'
                },
                options: [
                    { label: 'Vale, sabe el nombre. Ayudar.', next: 'safe_help', outcome: 'safe' },
                    { label: 'Aún sospechoso. Llamarla.', next: 'call_sarah', outcome: 'safe' },
                    { label: 'Enviar código.', next: 'fail_2fa', outcome: 'fail' },
                    { label: 'Ignorar.', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            verify_identity: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '¡Dios mío, sí soy yo! Estoy asustada porque mi carro se descompuso y mi teléfono se está muriendo. Necesito llamar a la grúa pero no tengo señal, solo wifi.'
                },
                options: [
                    { label: 'Está bien, ¿cómo puedo ayudar?', next: 'help_car', outcome: 'neutral' },
                    { label: 'Envíame una nota de voz', next: 'voice_note', outcome: 'neutral' },
                    { label: '¿Dónde estás exactamente?', next: 'ask_location', outcome: 'neutral' },
                    { label: 'Llamaré a tu mamá para ayudarte', next: 'call_mom', outcome: 'safe' }
                ]
            },
            help_car: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '¿Puedes enviarme $50 por CashApp para la grúa? Te lo devuelvo mañana.'
                },
                options: [
                    { label: 'Enviar $50.', next: 'fail_money', outcome: 'fail' },
                    { label: 'Yo llamaré a la grúa por ti.', next: 'safe_help', outcome: 'safe' },
                    { label: 'Nota de voz primero.', next: 'voice_note', outcome: 'neutral' },
                    { label: 'No.', next: 'deny_request', outcome: 'safe' }
                ]
            },
            ask_location: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: 'Estoy en la gasolinera Shell en la calle Main.'
                },
                options: [
                    { label: 'Iré allá.', next: 'safe_pickup', outcome: 'safe' },
                    { label: 'Enviar dinero para la grúa.', next: 'fail_money', outcome: 'fail' },
                    { label: 'Llamar a la gasolinera para verificar.', next: 'safe_help', outcome: 'safe' },
                    { label: 'Ignorar.', next: 'ignore_friend', outcome: 'safe' }
                ]
            },
            call_mom: {
                isEnd: true,
                success: true,
                message: 'Llamaste a su mamá.',
                feedback: 'Su mamá confirmó que Sarah realmente tenía problemas con el carro. Ayudaste sin arriesgar tu seguridad.'
            },
            voice_note: {
                content: {
                    type: 'social',
                    platform: 'Instagram',
                    sender: 'Sarah_Jenkins99',
                    message: '(Nota de Voz): "Oye, en serio, estoy atascada en la gasolinera de la 5ta. Por favor llama a una grúa por mí."'
                },
                options: [
                    { label: 'Esa es definitivamente su voz. Ayudarla.', next: 'safe_help', outcome: 'safe' },
                    { label: 'Podría ser voz IA. Aún sospechoso.', next: 'call_mom', outcome: 'safe' },
                    { label: 'Pedir dinero primero', next: 'fail_rude', outcome: 'neutral' },
                    { label: 'Ir a recogerla', next: 'safe_pickup', outcome: 'safe' }
                ]
            },
            fail_rude: {
                isEnd: true,
                success: true,
                message: 'Fuiste grosero, pero seguro.',
                feedback: 'Le pediste dinero a una amiga en apuros. No es amable, pero no te estafaron.'
            },
            safe_pickup: {
                isEnd: true,
                success: true,
                message: 'Fuiste a ayudar en persona.',
                feedback: 'Ir en persona (si es seguro) es una excelente manera de verificar. Encontraste a Sarah y la ayudaste.'
            },
            fail_money: {
                isEnd: true,
                success: false,
                message: 'Enviaste dinero a un potencial estafador.',
                feedback: 'Aunque parezca real, enviar dinero por CashApp/Zelle es arriesgado. Una vez enviado, se fue. Verifica por voz o llamada telefónica primero.'
            },
            fail_2fa: {
                isEnd: true,
                success: false,
                message: 'Entregaste tu código de 2FA.',
                feedback: 'Esta es la estafa de "Robo de Instagram". El código era en realidad para TU cuenta. Ahora han robado tu cuenta.'
            },
            safe_help: {
                isEnd: true,
                success: true,
                message: 'Ayudaste a tu amiga de forma segura.',
                feedback: '¡Realmente era Sarah! Al verificar su voz y la situación específica, confirmaste que no era un bot. ¡Buena amiga!'
            },
            text_real: {
                isEnd: true,
                success: true,
                message: 'Verificaste por un segundo canal.',
                feedback: 'Sarah respondió a tu texto confirmando que estaba atascada. La autenticación multifactor (usar un canal diferente) es la mejor manera de verificar.'
            }
        }
    },
    {
        id: 'service_legit',
        type: 'legit',
        isScam: false,
        title: 'Alerta de Fraude Bancario',
        description: 'Recibes un mensaje de texto sobre un cargo sospechoso.',
        initialStep: 'start',
        steps: {
            start: {
                content: {
                    type: 'phone',
                    caller: 'Alerta de Fraude Chase (72001)',
                    audio_text: 'Alerta de Fraude Chase: ¿Intentó realizar un cargo de $450.00 en WALMART? Responda SÍ o NO.'
                },
                options: [
                    { label: 'Responder NO', next: 'reply_no', outcome: 'neutral' },
                    { label: 'Responder SÍ', next: 'reply_yes', outcome: 'neutral' },
                    { label: 'Hacer clic en el enlace (si hubiera uno)', next: 'no_link', outcome: 'neutral' },
                    { label: 'Ignorar', next: 'ignore_alert', outcome: 'neutral' }
                ]
            },
            reply_yes: {
                content: {
                    type: 'phone',
                    caller: 'Alerta de Fraude Chase',
                    audio_text: 'Gracias. La transacción ha sido aprobada. Si no realizó esta compra, llámenos inmediatamente al 1-800-935-9935.'
                },
                options: [
                    { label: '¡No la hice! Llamarlos.', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Espera, leí mal. Responder NO.', next: 'reply_no', outcome: 'neutral' },
                    { label: 'Ignorar.', next: 'ignore_alert', outcome: 'neutral' },
                    { label: 'Bloquear número.', next: 'block_legit', outcome: 'neutral' }
                ]
            },
            ignore_alert: {
                isEnd: true,
                success: false,
                message: 'Ignoraste una alerta de fraude real.',
                feedback: 'Si ignoras una alerta real, el cargo fraudulento podría procesarse. Siempre verifica con tu app bancaria.'
            },
            reply_no: {
                content: {
                    type: 'phone',
                    caller: 'Alerta de Fraude Chase',
                    audio_text: 'Gracias. Hemos rechazado la transacción. Su tarjeta ha sido bloqueada. Enviaremos una nueva tarjeta en 3-5 días hábiles. No se requiere más acción.'
                },
                options: [
                    { label: 'Genial, gracias.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Llamar al número del reverso de mi tarjeta para confirmar', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Responder "¿Puedo desbloquearla ahora?"', next: 'ask_unlock', outcome: 'neutral' },
                    { label: 'Entrar en pánico', next: 'panic', outcome: 'neutral' }
                ]
            },
            ask_unlock: {
                content: {
                    type: 'phone',
                    caller: 'Alerta de Fraude Chase',
                    audio_text: 'Para desbloquear su tarjeta, por favor llame a nuestra línea de soporte. No podemos desbloquear por texto por seguridad.'
                },
                options: [
                    { label: 'Llamar a soporte.', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Responder "Por favor desbloquear".', next: 'safe_end', outcome: 'safe' },
                    { label: 'Ir a la sucursal del banco.', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Ignorar.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            panic: {
                content: {
                    type: 'info',
                    text: 'Empiezas a entrar en pánico. Revisas tu app bancaria y ves que la transacción está Pendiente/Rechazada.'
                },
                options: [
                    { label: 'Llamar al banco.', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Confiar en el texto, no hacer nada.', next: 'safe_end', outcome: 'safe' },
                    { label: 'Responder STOP.', next: 'reply_stop', outcome: 'neutral' },
                    { label: 'Publicar en Facebook.', next: 'safe_end', outcome: 'safe' }
                ]
            },
            reply_stop: {
                isEnd: true,
                success: false,
                message: 'Te diste de baja de las alertas de fraude.',
                feedback: 'Responder STOP a un número real del banco desactiva futuras alertas. Esto te deja vulnerable.'
            },
            no_link: {
                content: {
                    type: 'info',
                    text: 'Miras con atención. NO hay enlace en el mensaje. Solo pide una respuesta SÍ/NO. Esta es una buena señal de una alerta legítima.'
                },
                options: [
                    { label: 'Responder NO', next: 'reply_no', outcome: 'neutral' },
                    { label: 'Aún sospechoso. Llamar al banco directamente.', next: 'safe_verify', outcome: 'safe' },
                    { label: 'Bloquear el número', next: 'block_legit', outcome: 'neutral' },
                    { label: 'Responder STOP', next: 'reply_stop', outcome: 'neutral' }
                ]
            },
            safe_verify: {
                isEnd: true,
                success: true,
                message: 'Verificaste con el banco.',
                feedback: 'El agente confirmó que el texto era real y el cargo fue bloqueado. Llamar al número oficial siempre es la apuesta más segura.'
            },
            safe_end: {
                isEnd: true,
                success: true,
                message: 'Manejaste la alerta de fraude correctamente.',
                feedback: 'Las alertas de fraude reales a menudo solo piden Sí/No y no exigen que hagas clic en enlaces o inicies sesión. Te mantuviste seguro.'
            },
            block_legit: {
                isEnd: true,
                success: false,
                message: 'Bloqueaste alertas de fraude reales.',
                feedback: 'Ese era realmente Chase. Al bloquearlos, podrías perderte alertas futuras. Ser cauteloso es bueno, pero verificar es mejor que bloquear ciegamente.'
            }
        }
    }
];
