    let nextId = 1;
    let lastCourses = [];
    let lastResult  = null;

    /* ─── i18n ─── */

    const translations = {
        en: {
            htmlLang: 'en',
            pageTitle: 'Honor Roll Calculator',
            // Header
            headerTitle: 'Honor Roll Calculator',
            headerSubtitle: "Enter each course's academic, effort, and conduct grades to determine Honor Roll eligibility",
            helpLink: 'How to use this calculator',
            // Modal
            howToUse: 'How to Use',
            closeHelp: 'Close help',
            stepsTitle: 'Steps',
            step1: 'Click <strong>Add Course</strong> to add a row for each subject. The course name is optional.',
            step2: 'Fill in the <strong>Academic</strong>, <strong>Effort</strong>, and <strong>Conduct</strong> grade for each course.',
            step3: 'Click <strong>Calculate Honor Roll</strong> to see your eligibility result and a full pass/fail breakdown.',
            step4: 'Optionally click <strong>Print Report</strong> at the bottom of the result to open a formatted, print-ready summary.',
            gradeScalesTitle: 'Grade Scales',
            fieldHeader: 'Field',
            valuesHeader: 'Values',
            academicLabel: 'Academic',
            academicValues: 'GPA <strong>2.0 \u2013 4.0</strong>, or percentage <strong>50 \u2013 100</strong> (auto-converted: 100&nbsp;=&nbsp;4.0, 75&nbsp;=&nbsp;3.0, 50&nbsp;=&nbsp;2.0)',
            effortLabel: 'Effort',
            effortValues: '<strong>1</strong> = Excellent &nbsp; <strong>2</strong> = Good &nbsp; <strong>3</strong> = Satisfactory',
            conductLabel: 'Conduct',
            conductValues: '<strong>4</strong> = A &nbsp; <strong>3</strong> = B &nbsp; <strong>2</strong> = C',
            bulkImportTitle: 'Bulk Import',
            bulkImportDesc: 'Paste a comma-separated list of academic grades (e.g. <code style="background:var(--slate-100);padding:1px 5px;border-radius:4px;">3.7, 3.5, 4.0, 3.2</code>) into the bulk import box and click <strong>Import</strong>. Effort and Conduct default to <strong>1</strong> and <strong>4</strong> respectively \u2014 review them before calculating.<br><br>Expand <strong>\u201cHow to get your grades from Gradebook\u201d</strong> below the import box for a script that extracts grades automatically from the Miami-Dade portal.',
            hrLevelsTitle: 'Honor Roll Levels',
            principalBadge: 'Principal',
            principalLevelDesc: 'All academic &ge; 3.5 &nbsp;&bull;&nbsp; All effort = 1 &nbsp;&bull;&nbsp; All conduct = 4',
            superiorBadge: 'Superior',
            superiorLevelDesc: 'Academic avg &ge; 3.7 &nbsp;&bull;&nbsp; No academic &lt; 3.0 &nbsp;&bull;&nbsp; All effort &le; 2 &nbsp;&bull;&nbsp; Conduct avg &ge; 3.7 &nbsp;&bull;&nbsp; No conduct &le; 2',
            honorBadge: 'Honor',
            honorLevelDesc: 'Academic avg &ge; 3.5 &nbsp;&bull;&nbsp; At most 1 academic &lt; 3.0 &nbsp;&bull;&nbsp; All effort &le; 2 &nbsp;&bull;&nbsp; Conduct avg &ge; 3.0 &nbsp;&bull;&nbsp; No conduct &le; 2',
            // Input card
            courseGradesTitle: 'Course Grades',
            courseGradesSubtitle: '<strong>Academic grade:</strong> enter <strong>2.0 \u2013 4.0</strong>, or as a percentage <strong>50 \u2013 100</strong> (values above 4 are automatically converted: 100 = 4.0, 87.5 = 3.5, 75 = 3.0, 50 = 2.0).<br><strong>Effort:</strong> 1 = Excellent &bull; 2 = Good &bull; 3 = Satisfactory.&nbsp;&nbsp;<strong>Conduct:</strong> 4 = A &bull; 3 = B &bull; 2 = C.',
            colCourseName: 'Course Name',
            colAcademic: 'Academic (2\u20134 or %)',
            colEffort: 'Effort (1\u20133)',
            colConduct: 'Conduct (2\u20134)',
            addCourse: 'Add Course',
            orBulkImport: 'or bulk import',
            bulkPasteDesc: 'Paste academic grades as a <strong>comma-separated list</strong> (e.g. <code style="color:var(--slate-300);font-weight:400;">3.7, 3.5, 4.0, 3.2, 3.8, 3.6, 3.5</code>).',
            bulkNote: '<strong>Note:</strong> Bulk import sets <strong>Effort</strong> to <strong>1 (Excellent)</strong> and <strong>Conduct</strong> to <strong>4 (A)</strong> by default. Review and adjust these values for each course after importing if needed.',
            bulkPlaceholder: '3.7, 3.5, 4.0, 3.2, 3.8, 3.6, 3.5',
            importBtn: 'Import',
            gradebookSummary: 'How to get your grades from Gradebook',
            gradebookStep1: 'Go to <a href="https://www.dadeschools.net/resources" target="_blank" rel="noopener" style="color:var(--blue-700);font-weight:600;">dadeschools.net/resources</a>.',
            gradebookStep2: 'Click <strong>Portal</strong> &rarr; <strong>Parents</strong>.',
            gradebookStep3: 'Sign in using <strong>Google Sign-In</strong> or <strong>Apple Sign-In</strong>.',
            gradebookStep4: 'Click <strong>Gradebook</strong> to open your grades.',
            gradebookStep5: 'Press <strong>F12</strong> (or right-click &rarr; Inspect) to open Developer Tools.',
            gradebookStep6: 'Go to the <strong>Console</strong> tab.',
            gradebookStep7: 'Paste the script below and press <strong>Enter</strong>.',
            gradebookStep8: 'The comma-separated GPA list will be <strong>copied to your clipboard</strong>.',
            gradebookStep9: 'Come back here and <strong>paste</strong> it into the box above, then click <strong>Import</strong>.',
            copyBtn: 'Copy',
            copiedBtn: 'Copied!',
            // Calculate
            calculateBtn: 'Calculate Honor Roll',
            // Disclaimer
            disclaimer: '<strong>Disclaimer:</strong> This calculator is intended for reference purposes only. Results may not reflect official school determinations. Always verify Honor Roll eligibility with your school\'s records office.',
            // Requirements
            hrRequirements: 'Honor Roll Requirements',
            principalName: 'Principal Honor Roll',
            principalReqDesc: 'All academic grades &ge; 3.5 &nbsp;&bull;&nbsp; All effort grades = 1 &nbsp;&bull;&nbsp; All conduct grades = 4',
            superiorName: 'Superior Honor Roll',
            superiorReqDesc: 'Academic average &ge; 3.7 &nbsp;&bull;&nbsp; No academic grade &lt; 3.0 &nbsp;&bull;&nbsp; All effort grades &le; 2 &nbsp;&bull;&nbsp; Conduct average &ge; 3.7 &nbsp;&bull;&nbsp; No conduct &le; 2',
            honorName: 'Honor Roll',
            honorReqDesc: 'Academic average &ge; 3.5 &nbsp;&bull;&nbsp; At most 1 academic grade &lt; 3.0 &nbsp;&bull;&nbsp; All effort grades &le; 2 &nbsp;&bull;&nbsp; Conduct average &ge; 3.0 &nbsp;&bull;&nbsp; No conduct &le; 2',
            // Course row (dynamic)
            courseNamePlaceholder: 'Course name (optional)',
            courseNameAria: 'Course name',
            academicPlaceholder: 'e.g. 3.7 or 92',
            academicAria: 'Academic grade',
            effortAria: 'Effort grade',
            conductAria: 'Conduct grade',
            effort1: '1 \u2014 Excellent',
            effort2: '2 \u2014 Good',
            effort3: '3 \u2014 Satisfactory',
            conduct4: '4 \u2014 A',
            conduct3: '3 \u2014 B',
            conduct2: '2 \u2014 C',
            removeTitle: 'Remove',
            removeAria: 'Remove course',
            // Result
            academicAvgLabel: 'Academic Avg',
            conductAvgLabel: 'Conduct Avg',
            coursesLabel: 'Courses',
            criteriaBreakdown: 'Criteria Breakdown',
            principalTitle: 'Principal Honor Roll',
            principalResultDesc: 'Outstanding academic excellence \u2014 the highest distinction!',
            superiorTitle: 'Superior Honor Roll',
            superiorResultDesc: 'Exceptional achievement with no grade below 3.5.',
            honorTitle: 'Honor Roll',
            honorResultDesc: 'Great academic performance \u2014 keep it up!',
            noneTitle: 'No Honor Roll',
            noneResultDesc: 'Review the criteria below to see what to improve.',
            // Criteria
            critAllAcad35: 'All academic grades &ge; 3.5',
            critAllEffort1: 'All effort grades = 1 (Excellent)',
            critAllConduct4: 'All conduct grades = 4 (Excellent)',
            critAvgGte37: 'Academic average &ge; 3.7',
            critNoBelow3: 'No academic grade &lt; 3.0',
            critEffortLte2: 'All effort grades &le; 2',
            critConductGte37: 'Conduct average &ge; 3.7',
            critNoConductLow: 'No conduct grade &le; 2',
            critAvgGte35: 'Academic average &ge; 3.5',
            critMax1Below3: 'At most 1 academic grade &lt; 3.0',
            critConductGte30: 'Conduct average &ge; 3.0',
            yours: 'yours',
            youHave: 'you have',
            // Print report
            printBtn: 'Print Report',
            printTitle: 'Honor Roll Report',
            printAppTitle: 'Honor Roll Calculator',
            printSubtitle: 'Eligibility Report',
            printAcademicAvg: 'Academic Avg',
            printConductAvg: 'Conduct Avg',
            printCourses: 'Courses',
            printCourseGrades: 'Course Grades',
            printCourse: 'Course',
            printAcademic: 'Academic',
            printEffort: 'Effort',
            printConduct: 'Conduct',
            printCriteriaBreakdown: 'Criteria Breakdown',
            printDisclaimer: '<strong>Disclaimer:</strong> This report is for reference purposes only. Always verify Honor Roll eligibility with your school\'s records office.',
            printCritAllAcad35: 'All academic grades \u2265 3.5',
            printCritAllEffort1: 'All effort grades = 1 (Excellent)',
            printCritAllConduct4: 'All conduct grades = 4 (A)',
            printCritAvgGte37: 'Academic average \u2265 3.7',
            printCritNoBelow3: 'No academic grade < 3.0',
            printCritEffortLte2: 'All effort grades \u2264 2',
            printCritConductGte37: 'Conduct average \u2265 3.7',
            printCritNoConductLow: 'No conduct grade \u2264 2',
            printCritAvgGte35: 'Academic average \u2265 3.5',
            printCritMax1Below3: 'At most 1 academic < 3.0',
            printCritConductGte30: 'Conduct average \u2265 3.0',
            // Error messages (functions)
            errFillAll:   (label) => `"${label}": please fill in all three grade fields.`,
            errAcadRange: (label) => `"${label}": academic grade must be 2.0\u20134.0 or a percentage 50\u2013100.`,
            errAddCourse: 'Please add at least one course.',
            bulkErrEmpty:   'Please paste a comma-separated list of grades.',
            bulkErrInvalid: (val, pos) => `Invalid grade \u201c${val}\u201d at position ${pos}. Each value must be 2.0\u20134.0 or a percentage 50\u2013100.`,
            bulkErrNoGrades: 'No valid grades found in the input.',
            bulkSuccess: (n) => `Successfully imported ${n} course grade${n > 1 ? 's' : ''}. Review effort and conduct grades, then calculate.`,
            courseName: (n) => `Course ${n}`,
            // Print effort/conduct labels
            effortLabel1: '1 \u2014 Excellent',
            effortLabel2: '2 \u2014 Good',
            effortLabel3: '3 \u2014 Satisfactory',
            conductLabel4: '4 \u2014 A',
            conductLabel3: '3 \u2014 B',
            conductLabel2: '2 \u2014 C',
        },
        es: {
            htmlLang: 'es',
            pageTitle: 'Calculadora de Cuadro de Honor',
            // Header
            headerTitle: 'Calculadora de Cuadro de Honor',
            headerSubtitle: 'Ingresa las calificaciones acad\u00e9micas, de esfuerzo y conducta de cada materia para verificar tu elegibilidad al Cuadro de Honor',
            helpLink: 'C\u00f3mo usar esta calculadora',
            // Modal
            howToUse: 'C\u00f3mo Usar',
            closeHelp: 'Cerrar ayuda',
            stepsTitle: 'Pasos',
            step1: 'Haz clic en <strong>Agregar Materia</strong> para a\u00f1adir una fila por cada asignatura. El nombre de la materia es opcional.',
            step2: 'Ingresa la calificaci\u00f3n <strong>Acad\u00e9mica</strong>, de <strong>Esfuerzo</strong> y de <strong>Conducta</strong> de cada materia.',
            step3: 'Haz clic en <strong>Calcular Cuadro de Honor</strong> para ver tu resultado y un desglose completo.',
            step4: 'Opcionalmente, haz clic en <strong>Imprimir Informe</strong> al final del resultado para abrir un resumen listo para imprimir.',
            gradeScalesTitle: 'Escalas de Calificaciones',
            fieldHeader: 'Campo',
            valuesHeader: 'Valores',
            academicLabel: 'Acad\u00e9mico',
            academicValues: 'GPA <strong>2.0 \u2013 4.0</strong>, o porcentaje <strong>50 \u2013 100</strong> (conversi\u00f3n autom\u00e1tica: 100&nbsp;=&nbsp;4.0, 75&nbsp;=&nbsp;3.0, 50&nbsp;=&nbsp;2.0)',
            effortLabel: 'Esfuerzo',
            effortValues: '<strong>1</strong> = Excelente &nbsp; <strong>2</strong> = Bueno &nbsp; <strong>3</strong> = Satisfactorio',
            conductLabel: 'Conducta',
            conductValues: '<strong>4</strong> = A &nbsp; <strong>3</strong> = B &nbsp; <strong>2</strong> = C',
            bulkImportTitle: 'Importaci\u00f3n Masiva',
            bulkImportDesc: 'Pega una lista de calificaciones acad\u00e9micas separadas por comas (ej. <code style="background:var(--slate-100);padding:1px 5px;border-radius:4px;">3.7, 3.5, 4.0, 3.2</code>) en el cuadro de importaci\u00f3n y haz clic en <strong>Importar</strong>. Esfuerzo y Conducta se establecen en <strong>1</strong> y <strong>4</strong> respectivamente de forma predeterminada \u2014 rev\u00edsalos antes de calcular.<br><br>Despliega <strong>\u201cC\u00f3mo obtener tus calificaciones del Gradebook\u201d</strong> debajo del cuadro de importaci\u00f3n para un script que extrae las calificaciones autom\u00e1ticamente del portal de Miami-Dade.',
            hrLevelsTitle: 'Niveles del Cuadro de Honor',
            principalBadge: 'Director',
            principalLevelDesc: 'Todo acad\u00e9mico &ge; 3.5 &nbsp;&bull;&nbsp; Todo esfuerzo = 1 &nbsp;&bull;&nbsp; Toda conducta = 4',
            superiorBadge: 'Superior',
            superiorLevelDesc: 'Prom. acad\u00e9mico &ge; 3.7 &nbsp;&bull;&nbsp; Ning\u00fan acad\u00e9mico &lt; 3.0 &nbsp;&bull;&nbsp; Todo esfuerzo &le; 2 &nbsp;&bull;&nbsp; Prom. conducta &ge; 3.7 &nbsp;&bull;&nbsp; Ninguna conducta &le; 2',
            honorBadge: 'Honor',
            honorLevelDesc: 'Prom. acad\u00e9mico &ge; 3.5 &nbsp;&bull;&nbsp; M\u00e1x. 1 acad\u00e9mico &lt; 3.0 &nbsp;&bull;&nbsp; Todo esfuerzo &le; 2 &nbsp;&bull;&nbsp; Prom. conducta &ge; 3.0 &nbsp;&bull;&nbsp; Ninguna conducta &le; 2',
            // Input card
            courseGradesTitle: 'Calificaciones por Materia',
            courseGradesSubtitle: '<strong>Calificaci\u00f3n acad\u00e9mica:</strong> ingresa <strong>2.0 \u2013 4.0</strong>, o como porcentaje <strong>50 \u2013 100</strong> (los valores sobre 4 se convierten autom\u00e1ticamente: 100 = 4.0, 87.5 = 3.5, 75 = 3.0, 50 = 2.0).<br><strong>Esfuerzo:</strong> 1 = Excelente &bull; 2 = Bueno &bull; 3 = Satisfactorio.&nbsp;&nbsp;<strong>Conducta:</strong> 4 = A &bull; 3 = B &bull; 2 = C.',
            colCourseName: 'Nombre de Materia',
            colAcademic: 'Acad\u00e9mico (2\u20134 o %)',
            colEffort: 'Esfuerzo (1\u20133)',
            colConduct: 'Conducta (2\u20134)',
            addCourse: 'Agregar Materia',
            orBulkImport: 'o importar en masa',
            bulkPasteDesc: 'Pega las calificaciones acad\u00e9micas como una <strong>lista separada por comas</strong> (ej. <code style="color:var(--slate-300);font-weight:400;">3.7, 3.5, 4.0, 3.2, 3.8, 3.6, 3.5</code>).',
            bulkNote: '<strong>Nota:</strong> La importaci\u00f3n masiva establece <strong>Esfuerzo</strong> en <strong>1 (Excelente)</strong> y <strong>Conducta</strong> en <strong>4 (A)</strong> por defecto. Revisa y ajusta estos valores seg\u00fan sea necesario.',
            bulkPlaceholder: '3.7, 3.5, 4.0, 3.2, 3.8, 3.6, 3.5',
            importBtn: 'Importar',
            gradebookSummary: 'C\u00f3mo obtener tus calificaciones del Gradebook',
            gradebookStep1: 'Ve a <a href="https://www.dadeschools.net/resources" target="_blank" rel="noopener" style="color:var(--blue-700);font-weight:600;">dadeschools.net/resources</a>.',
            gradebookStep2: 'Haz clic en <strong>Portal</strong> &rarr; <strong>Parents</strong>.',
            gradebookStep3: 'Inicia sesi\u00f3n con <strong>Google Sign-In</strong> o <strong>Apple Sign-In</strong>.',
            gradebookStep4: 'Haz clic en <strong>Gradebook</strong> para ver tus calificaciones.',
            gradebookStep5: 'Presiona <strong>F12</strong> (o clic derecho &rarr; Inspeccionar) para abrir las Herramientas de Desarrollador.',
            gradebookStep6: 'Ve a la pesta\u00f1a <strong>Console</strong>.',
            gradebookStep7: 'Pega el script de abajo y presiona <strong>Enter</strong>.',
            gradebookStep8: 'La lista de GPA separada por comas se <strong>copiar\u00e1 a tu portapapeles</strong>.',
            gradebookStep9: 'Regresa aqu\u00ed y <strong>p\u00e9gala</strong> en el cuadro de arriba, luego haz clic en <strong>Importar</strong>.',
            copyBtn: 'Copiar',
            copiedBtn: '\u00a1Copiado!',
            // Calculate
            calculateBtn: 'Calcular Cuadro de Honor',
            // Disclaimer
            disclaimer: '<strong>Aviso:</strong> Esta calculadora es solo para referencia. Los resultados pueden no reflejar la determinaci\u00f3n oficial de la escuela. Siempre verifica tu elegibilidad con la oficina de registros.',
            // Requirements
            hrRequirements: 'Requisitos del Cuadro de Honor',
            principalName: 'Cuadro de Honor del Director',
            principalReqDesc: 'Todo acad\u00e9mico &ge; 3.5 &nbsp;&bull;&nbsp; Todo esfuerzo = 1 &nbsp;&bull;&nbsp; Toda conducta = 4',
            superiorName: 'Cuadro de Honor Superior',
            superiorReqDesc: 'Promedio acad\u00e9mico &ge; 3.7 &nbsp;&bull;&nbsp; Ning\u00fan acad\u00e9mico &lt; 3.0 &nbsp;&bull;&nbsp; Todo esfuerzo &le; 2 &nbsp;&bull;&nbsp; Promedio conducta &ge; 3.7 &nbsp;&bull;&nbsp; Ninguna conducta &le; 2',
            honorName: 'Cuadro de Honor',
            honorReqDesc: 'Promedio acad\u00e9mico &ge; 3.5 &nbsp;&bull;&nbsp; M\u00e1ximo 1 acad\u00e9mico &lt; 3.0 &nbsp;&bull;&nbsp; Todo esfuerzo &le; 2 &nbsp;&bull;&nbsp; Promedio conducta &ge; 3.0 &nbsp;&bull;&nbsp; Ninguna conducta &le; 2',
            // Course row (dynamic)
            courseNamePlaceholder: 'Nombre de materia (opcional)',
            courseNameAria: 'Nombre de materia',
            academicPlaceholder: 'ej. 3.7 o 92',
            academicAria: 'Calificaci\u00f3n acad\u00e9mica',
            effortAria: 'Calificaci\u00f3n de esfuerzo',
            conductAria: 'Calificaci\u00f3n de conducta',
            effort1: '1 \u2014 Excelente',
            effort2: '2 \u2014 Bueno',
            effort3: '3 \u2014 Satisfactorio',
            conduct4: '4 \u2014 A',
            conduct3: '3 \u2014 B',
            conduct2: '2 \u2014 C',
            removeTitle: 'Eliminar',
            removeAria: 'Eliminar materia',
            // Result
            academicAvgLabel: 'Prom. Acad\u00e9mico',
            conductAvgLabel: 'Prom. Conducta',
            coursesLabel: 'Materias',
            criteriaBreakdown: 'Desglose de Criterios',
            principalTitle: 'Cuadro de Honor del Director',
            principalResultDesc: '\u00a1Excelencia acad\u00e9mica sobresaliente \u2014 la distinci\u00f3n m\u00e1s alta!',
            superiorTitle: 'Cuadro de Honor Superior',
            superiorResultDesc: 'Logro excepcional sin ninguna calificaci\u00f3n por debajo de 3.5.',
            honorTitle: 'Cuadro de Honor',
            honorResultDesc: '\u00a1Gran rendimiento acad\u00e9mico \u2014 sigue as\u00ed!',
            noneTitle: 'Sin Cuadro de Honor',
            noneResultDesc: 'Revisa los criterios a continuaci\u00f3n para ver qu\u00e9 mejorar.',
            // Criteria
            critAllAcad35: 'Todo acad\u00e9mico &ge; 3.5',
            critAllEffort1: 'Todo esfuerzo = 1 (Excelente)',
            critAllConduct4: 'Toda conducta = 4 (Excelente)',
            critAvgGte37: 'Promedio acad\u00e9mico &ge; 3.7',
            critNoBelow3: 'Ning\u00fan acad\u00e9mico &lt; 3.0',
            critEffortLte2: 'Todo esfuerzo &le; 2',
            critConductGte37: 'Promedio conducta &ge; 3.7',
            critNoConductLow: 'Ninguna conducta &le; 2',
            critAvgGte35: 'Promedio acad\u00e9mico &ge; 3.5',
            critMax1Below3: 'M\u00e1x. 1 acad\u00e9mico &lt; 3.0',
            critConductGte30: 'Promedio conducta &ge; 3.0',
            yours: 'tuyo',
            youHave: 'tienes',
            // Print report
            printBtn: 'Imprimir Informe',
            printTitle: 'Informe del Cuadro de Honor',
            printAppTitle: 'Calculadora de Cuadro de Honor',
            printSubtitle: 'Informe de Elegibilidad',
            printAcademicAvg: 'Prom. Acad\u00e9mico',
            printConductAvg: 'Prom. Conducta',
            printCourses: 'Materias',
            printCourseGrades: 'Calificaciones por Materia',
            printCourse: 'Materia',
            printAcademic: 'Acad\u00e9mico',
            printEffort: 'Esfuerzo',
            printConduct: 'Conducta',
            printCriteriaBreakdown: 'Desglose de Criterios',
            printDisclaimer: '<strong>Aviso:</strong> Este informe es solo para referencia. Siempre verifica tu elegibilidad con la oficina de registros de tu escuela.',
            printCritAllAcad35: 'Todo acad\u00e9mico \u2265 3.5',
            printCritAllEffort1: 'Todo esfuerzo = 1 (Excelente)',
            printCritAllConduct4: 'Toda conducta = 4 (A)',
            printCritAvgGte37: 'Promedio acad\u00e9mico \u2265 3.7',
            printCritNoBelow3: 'Ning\u00fan acad\u00e9mico < 3.0',
            printCritEffortLte2: 'Todo esfuerzo \u2264 2',
            printCritConductGte37: 'Promedio conducta \u2265 3.7',
            printCritNoConductLow: 'Ninguna conducta \u2264 2',
            printCritAvgGte35: 'Promedio acad\u00e9mico \u2265 3.5',
            printCritMax1Below3: 'M\u00e1x. 1 acad\u00e9mico < 3.0',
            printCritConductGte30: 'Promedio conducta \u2265 3.0',
            // Error messages (functions)
            errFillAll:   (label) => `\u201c${label}\u201d: por favor completa los tres campos de calificaci\u00f3n.`,
            errAcadRange: (label) => `\u201c${label}\u201d: la calificaci\u00f3n acad\u00e9mica debe ser 2.0\u20134.0 o un porcentaje 50\u2013100.`,
            errAddCourse: 'Por favor, agrega al menos una materia.',
            bulkErrEmpty:   'Por favor, pega una lista de calificaciones separadas por comas.',
            bulkErrInvalid: (val, pos) => `Calificaci\u00f3n inv\u00e1lida \u201c${val}\u201d en la posici\u00f3n ${pos}. Cada valor debe ser 2.0\u20134.0 o un porcentaje 50\u2013100.`,
            bulkErrNoGrades: 'No se encontraron calificaciones v\u00e1lidas en la entrada.',
            bulkSuccess: (n) => `Se importaron ${n} calificaci\u00f3n${n > 1 ? 'es' : ''} exitosamente. Revisa esfuerzo y conducta antes de calcular.`,
            courseName: (n) => `Materia ${n}`,
            // Print effort/conduct labels
            effortLabel1: '1 \u2014 Excelente',
            effortLabel2: '2 \u2014 Bueno',
            effortLabel3: '3 \u2014 Satisfactorio',
            conductLabel4: '4 \u2014 A',
            conductLabel3: '3 \u2014 B',
            conductLabel2: '2 \u2014 C',
        },
    };

    let currentLang = localStorage.getItem('hr_lang') || 'en';

    function t(key, ...args) {
        const val = (translations[currentLang] && translations[currentLang][key] !== undefined)
            ? translations[currentLang][key]
            : translations.en[key];
        return typeof val === 'function' ? val(...args) : val;
    }

    function applyTranslations() {
        document.documentElement.lang = t('htmlLang');
        document.title = t('pageTitle');

        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            el.innerHTML = t(el.dataset.i18nHtml);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
        });

        // Highlight active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });

        // Update existing course rows
        updateExistingCourseRows();
    }

    function updateExistingCourseRows() {
        document.querySelectorAll('.col-effort').forEach(sel => {
            const val = sel.value;
            if (sel.options[0]) sel.options[0].text = t('effort1');
            if (sel.options[1]) sel.options[1].text = t('effort2');
            if (sel.options[2]) sel.options[2].text = t('effort3');
            sel.value = val;
            sel.setAttribute('aria-label', t('effortAria'));
        });
        document.querySelectorAll('.col-conduct').forEach(sel => {
            const val = sel.value;
            if (sel.options[0]) sel.options[0].text = t('conduct4');
            if (sel.options[1]) sel.options[1].text = t('conduct3');
            if (sel.options[2]) sel.options[2].text = t('conduct2');
            sel.value = val;
            sel.setAttribute('aria-label', t('conductAria'));
        });
        document.querySelectorAll('.col-name').forEach(el => {
            el.placeholder = t('courseNamePlaceholder');
            el.setAttribute('aria-label', t('courseNameAria'));
        });
        document.querySelectorAll('.col-academic').forEach(el => {
            el.placeholder = t('academicPlaceholder');
            el.setAttribute('aria-label', t('academicAria'));
        });
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.setAttribute('title', t('removeTitle'));
            btn.setAttribute('aria-label', t('removeAria'));
        });
    }

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('hr_lang', lang);
        applyTranslations();
        if (lastResult) renderResult(lastResult, lastCourses, true);
    }

    /* ─── Conversion & validation ─── */

    function toScale(raw) {
        // Values > 4 are percentages; divide by 25 to map 50–100 → 2.0–4.0
        return raw > 4 ? raw / 25 : raw;
    }

    function isValidAcademic(raw) {
        return !isNaN(raw) && ((raw >= 2 && raw <= 4) || (raw >= 50 && raw <= 100));
    }

    /* ─── DOM helpers ─── */

    function addCourse() {
        const id = nextId++;
        const div = document.createElement('div');
        div.className = 'course-row col-widths';
        div.id = `row-${id}`;
        div.innerHTML = `
            <input class="col-name" type="text" placeholder="${t('courseNamePlaceholder')}" aria-label="${t('courseNameAria')}" />
            <input class="col-academic" type="number" placeholder="${t('academicPlaceholder')}"
                   min="2" max="100" step="0.01" aria-label="${t('academicAria')}"
                   oninput="liveValidate(this)" />
            <select class="col-effort" aria-label="${t('effortAria')}">
                <option value="1" selected>${t('effort1')}</option>
                <option value="2">${t('effort2')}</option>
                <option value="3">${t('effort3')}</option>
            </select>
            <select class="col-conduct" aria-label="${t('conductAria')}">
                <option value="4" selected>${t('conduct4')}</option>
                <option value="3">${t('conduct3')}</option>
                <option value="2">${t('conduct2')}</option>
            </select>
            <button class="remove-btn" onclick="removeCourse(${id})" title="${t('removeTitle')}" aria-label="${t('removeAria')}">&#x2715;</button>
        `;
        document.getElementById('coursesContainer').appendChild(div);
    }

    function removeCourse(id) {
        const allRows = document.querySelectorAll('.course-row');
        if (allRows.length <= 1) return; // always keep at least one
        const row = document.getElementById(`row-${id}`);
        if (row) row.remove();
    }

    function liveValidate(input) {
        if (input.value === '') { input.classList.remove('field-error'); return; }
        input.classList.toggle('field-error', !isValidAcademic(parseFloat(input.value)));
    }

    /* ─── Calculation ─── */

    function calculate() {
        const banner = document.getElementById('errorBanner');
        banner.style.display = 'none';

        const rows = document.querySelectorAll('.course-row');
        const courses = [];
        let err = '';

        rows.forEach((row, i) => {
            if (err) return;
            const label    = row.querySelector('.col-name').value.trim() || t('courseName', i + 1);
            const rawAcad  = parseFloat(row.querySelector('.col-academic').value);
            const effort   = parseInt(row.querySelector('.col-effort').value,  10);
            const conduct  = parseInt(row.querySelector('.col-conduct').value, 10);

            if (isNaN(rawAcad) || isNaN(effort) || isNaN(conduct)) {
                err = t('errFillAll', label);
                return;
            }
            if (!isValidAcademic(rawAcad)) {
                err = t('errAcadRange', label);
                return;
            }
            courses.push({ label, academic: toScale(rawAcad), effort, conduct });
        });

        if (err) {
            banner.textContent = err;
            banner.style.display = 'block';
            return;
        }
        if (courses.length === 0) {
            banner.textContent = t('errAddCourse');
            banner.style.display = 'block';
            return;
        }

        lastCourses = courses;
        lastResult  = computeResult(courses);
        renderResult(lastResult, courses);
    }

    function computeResult(courses) {
        const acad    = courses.map(c => c.academic);
        const effort  = courses.map(c => c.effort);
        const conduct = courses.map(c => c.conduct);

        const academicAvg = Math.round(avg(acad)    * 100) / 100;
        const conductAvg  = Math.round(avg(conduct) * 100) / 100;
        const below3Count = acad.filter(g => g < 3).length;

        const checks = {
            principal: {
                allAcad35:   acad.every(g => g >= 3.5),
                allEffort1:  effort.every(e => e === 1),
                allConduct4: conduct.every(c => c >= 4),
            },
            superior: {
                avgGte37:       academicAvg >= 3.7,
                noBelow349:     acad.every(g => g >= 3.0),
                effortLte2:     effort.every(e => e <= 2),
                conductGte37:   conductAvg >= 3.7,
                noConduct2:     conduct.every(c => c > 2),
            },
            honor: {
                avgGte35:       academicAvg >= 3.5,
                max1Below3:     below3Count <= 1,
                effortLte2:     effort.every(e => e <= 2),
                conductGte30:   conductAvg >= 3.0,
                noConduct2:     conduct.every(c => c > 2),
            },
        };

        let level;
        if (allPass(checks.principal))       level = 'principal';
        else if (allPass(checks.superior))   level = 'superior';
        else if (allPass(checks.honor))      level = 'honor';
        else                                 level = 'none';

        return { level, checks, academicAvg, conductAvg, below3Count, courseCount: courses.length };
    }

    function avg(arr) { return arr.reduce((s, v) => s + v, 0) / arr.length; }
    function allPass(obj) { return Object.values(obj).every(Boolean); }

    /* ─── Rendering ─── */

    function renderResult(r, courses, noScroll) {
        const container = document.getElementById('resultContainer');
        container.style.display = 'block';

        const meta = {
            principal: { cls: 'principal', icon: '&#127885;', title: t('principalTitle'), desc: t('principalResultDesc') },
            superior:  { cls: 'superior',  icon: '&#11088;',  title: t('superiorTitle'),  desc: t('superiorResultDesc') },
            honor:     { cls: 'honor',     icon: '&#127942;', title: t('honorTitle'),      desc: t('honorResultDesc') },
            none:      { cls: 'none',      icon: '&#128203;', title: t('noneTitle'),       desc: t('noneResultDesc') },
        }[r.level];

        const { checks, academicAvg, conductAvg, below3Count, courseCount } = r;

        container.innerHTML = `
            <div class="result-wrapper">
                <div class="result-hero ${meta.cls}">
                    <div class="result-icon">${meta.icon}</div>
                    <div class="result-level">${meta.title}</div>
                    <div class="result-desc">${meta.desc}</div>
                    <div class="result-stats">
                        <div class="stat">
                            <div class="stat-label">${t('academicAvgLabel')}</div>
                            <div class="stat-val">${academicAvg.toFixed(2)}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">${t('conductAvgLabel')}</div>
                            <div class="stat-val">${conductAvg.toFixed(2)}</div>
                        </div>
                        <div class="stat">
                            <div class="stat-label">${t('coursesLabel')}</div>
                            <div class="stat-val">${courseCount}</div>
                        </div>
                    </div>
                </div>

                <div class="criteria-section">
                    <div class="criteria-title">${t('criteriaBreakdown')}</div>

                    <div class="criteria-group">
                        <div class="criteria-group-label">
                            <span class="level-dot dot-principal"></span>${t('principalTitle')}
                        </div>
                        ${crit(checks.principal.allAcad35,   t('critAllAcad35'))}
                        ${crit(checks.principal.allEffort1,  t('critAllEffort1'))}
                        ${crit(checks.principal.allConduct4, t('critAllConduct4'))}
                    </div>

                    <div class="criteria-group">
                        <div class="criteria-group-label">
                            <span class="level-dot dot-superior"></span>${t('superiorTitle')}
                        </div>
                        ${crit(checks.superior.avgGte37,     `${t('critAvgGte37')} &nbsp;<em>(${t('yours')}: ${academicAvg.toFixed(2)})</em>`)}
                        ${crit(checks.superior.noBelow349,   t('critNoBelow3'))}
                        ${crit(checks.superior.effortLte2,   t('critEffortLte2'))}
                        ${crit(checks.superior.conductGte37, `${t('critConductGte37')} &nbsp;<em>(${t('yours')}: ${conductAvg.toFixed(2)})</em>`)}
                        ${crit(checks.superior.noConduct2,   t('critNoConductLow'))}
                    </div>

                    <div class="criteria-group">
                        <div class="criteria-group-label">
                            <span class="level-dot dot-honor"></span>${t('honorTitle')}
                        </div>
                        ${crit(checks.honor.avgGte35,     `${t('critAvgGte35')} &nbsp;<em>(${t('yours')}: ${academicAvg.toFixed(2)})</em>`)}
                        ${crit(checks.honor.max1Below3,   `${t('critMax1Below3')} &nbsp;<em>(${t('youHave')}: ${below3Count})</em>`)}
                        ${crit(checks.honor.effortLte2,   t('critEffortLte2'))}
                        ${crit(checks.honor.conductGte30, `${t('critConductGte30')} &nbsp;<em>(${t('yours')}: ${conductAvg.toFixed(2)})</em>`)}
                        ${crit(checks.honor.noConduct2,   t('critNoConductLow'))}
                    </div>
                </div>
            </div>
            <button class="print-btn" onclick="printReport()">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                    <rect x="6" y="14" width="12" height="8"/>
                </svg>
                ${t('printBtn')}
            </button>
        `;

        if (!noScroll) container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function crit(pass, label) {
        return `<div class="criterion ${pass ? 'pass' : 'fail'}">
                    <span class="criterion-icon">${pass ? '&#10003;' : '&#10007;'}</span>
                    <span>${label}</span>
                </div>`;
    }

    /* ─── Print Report ─── */

    function printReport() {
        if (!lastResult || lastCourses.length === 0) return;

        const r       = lastResult;
        const courses = lastCourses;
        const { checks, academicAvg, conductAvg, below3Count, courseCount } = r;

        const levelMeta = {
            principal: { title: t('principalTitle'), color: '#d97706' },
            superior:  { title: t('superiorTitle'),  color: '#475569' },
            honor:     { title: t('honorTitle'),     color: '#c2410c' },
            none:      { title: t('noneTitle'),      color: '#64748b' },
        }[r.level];

        const effortLabel  = { 1: t('effortLabel1'), 2: t('effortLabel2'), 3: t('effortLabel3') };
        const conductLabel = { 4: t('conductLabel4'), 3: t('conductLabel3'), 2: t('conductLabel2') };

        const locale = currentLang === 'es' ? 'es-US' : 'en-US';
        const today = new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

        function pc(pass, label) {
            const icon  = pass ? '✓' : '✗';
            const color = pass ? '#15803d' : '#dc2626';
            const bg    = pass ? '#dcfce7' : '#fee2e2';
            return `<div style="display:flex;gap:7px;padding:5px 10px;border-radius:5px;background:${bg};margin-bottom:4px;font-size:0.8rem;color:${color};">
                        <span style="font-weight:900;flex-shrink:0;">${icon}</span><span>${label}</span>
                    </div>`;
        }

        const courseRows = courses.map(c => `
            <tr>
                <td>${c.label}</td>
                <td style="text-align:center;">${c.academic.toFixed(2)}</td>
                <td style="text-align:center;">${effortLabel[c.effort] || c.effort}</td>
                <td style="text-align:center;">${conductLabel[c.conduct] || c.conduct}</td>
            </tr>`).join('');

        const html = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
<meta charset="UTF-8">
<title>${t('printTitle')}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a;padding:36px 48px;font-size:14px;}
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #e2e8f0;padding-bottom:14px;margin-bottom:22px;}
  h1{font-size:1.35rem;font-weight:800;}
  .sub{font-size:0.82rem;color:#64748b;margin-top:2px;}
  .date{font-size:0.82rem;color:#64748b;}
  .banner{border-left:5px solid ${levelMeta.color};padding:14px 18px;background:#f8fafc;border-radius:8px;margin-bottom:22px;}
  .level{font-size:1.25rem;font-weight:800;color:${levelMeta.color};margin-bottom:8px;}
  .stats{display:flex;gap:32px;margin-top:4px;}
  .sl{font-size:0.68rem;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;}
  .sv{font-size:1.05rem;font-weight:700;}
  .sec{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#64748b;margin-bottom:10px;}
  table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:0.85rem;}
  th{background:#f1f5f9;text-align:left;padding:8px 12px;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.5px;color:#64748b;font-weight:700;border-bottom:1px solid #cbd5e1;}
  td{padding:8px 12px;border-bottom:1px solid #f1f5f9;}
  tr:last-child td{border-bottom:none;}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px;}
  .col h3{font-size:0.82rem;font-weight:700;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #e2e8f0;}
  .disc{font-size:0.75rem;color:#92400e;background:#fef3c7;border-left:3px solid #d97706;padding:8px 12px;border-radius:5px;}
  @media print{body{padding:20px 28px;}}
</style>
</head>
<body>
<div class="hdr">
  <div><h1>${t('printAppTitle')}</h1><div class="sub">${t('printSubtitle')}</div></div>
  <div class="date">${today}</div>
</div>

<div class="banner">
  <div class="level">${levelMeta.title}</div>
  <div class="stats">
    <div><div class="sl">${t('printAcademicAvg')}</div><div class="sv">${academicAvg.toFixed(2)}</div></div>
    <div><div class="sl">${t('printConductAvg')}</div><div class="sv">${conductAvg.toFixed(2)}</div></div>
    <div><div class="sl">${t('printCourses')}</div><div class="sv">${courseCount}</div></div>
  </div>
</div>

<div class="sec">${t('printCourseGrades')}</div>
<table>
  <thead><tr><th>${t('printCourse')}</th><th style="text-align:center;">${t('printAcademic')}</th><th style="text-align:center;">${t('printEffort')}</th><th style="text-align:center;">${t('printConduct')}</th></tr></thead>
  <tbody>${courseRows}</tbody>
</table>

<div class="sec">${t('printCriteriaBreakdown')}</div>
<div class="grid">
  <div class="col">
    <h3>${t('principalTitle')}</h3>
    ${pc(checks.principal.allAcad35,   t('printCritAllAcad35'))}
    ${pc(checks.principal.allEffort1,  t('printCritAllEffort1'))}
    ${pc(checks.principal.allConduct4, t('printCritAllConduct4'))}
  </div>
  <div class="col">
    <h3>${t('superiorTitle')}</h3>
    ${pc(checks.superior.avgGte37,     t('printCritAvgGte37') + ' (' + academicAvg.toFixed(2) + ')')}
    ${pc(checks.superior.noBelow349,   t('printCritNoBelow3'))}
    ${pc(checks.superior.effortLte2,   t('printCritEffortLte2'))}
    ${pc(checks.superior.conductGte37, t('printCritConductGte37') + ' (' + conductAvg.toFixed(2) + ')')}
    ${pc(checks.superior.noConduct2,   t('printCritNoConductLow'))}
  </div>
  <div class="col">
    <h3>${t('honorTitle')}</h3>
    ${pc(checks.honor.avgGte35,     t('printCritAvgGte35') + ' (' + academicAvg.toFixed(2) + ')')}
    ${pc(checks.honor.max1Below3,   t('printCritMax1Below3') + ' (' + t('youHave') + ': ' + below3Count + ')')}
    ${pc(checks.honor.effortLte2,   t('printCritEffortLte2'))}
    ${pc(checks.honor.conductGte30, t('printCritConductGte30') + ' (' + conductAvg.toFixed(2) + ')')}
    ${pc(checks.honor.noConduct2,   t('printCritNoConductLow'))}
  </div>
</div>

<div class="disc">${t('printDisclaimer')}</div>
<script>window.onload=function(){window.print();};<\/script>
</body></html>`;

        const win = window.open('', '_blank', 'width=920,height=720');
        win.document.write(html);
        win.document.close();
    }

    /* ─── Bulk import ─── */

    function importBulkGrades() {
        const feedback = document.getElementById('importFeedback');
        const raw = document.getElementById('bulkGrades').value.trim();

        if (!raw) {
            showFeedback(feedback, t('bulkErrEmpty'), false);
            return;
        }

        const values = raw.split(/[,\s]+/).map(s => s.trim()).filter(s => s !== '');
        const grades = [];

        for (let i = 0; i < values.length; i++) {
            const num = parseFloat(values[i]);
            if (isNaN(num) || !isValidAcademic(num)) {
                showFeedback(feedback, t('bulkErrInvalid', values[i], i + 1), false);
                return;
            }
            grades.push(num);
        }

        if (grades.length === 0) {
            showFeedback(feedback, t('bulkErrNoGrades'), false);
            return;
        }

        // Clear existing rows
        document.getElementById('coursesContainer').innerHTML = '';
        nextId = 1;

        // Add a row per grade
        grades.forEach((grade, i) => {
            addCourse();
            const row = document.getElementById(`row-${nextId - 1}`);
            row.querySelector('.col-name').value = t('courseName', i + 1);
            row.querySelector('.col-academic').value = grade;
            row.querySelector('.col-effort').value = '1';
            row.querySelector('.col-conduct').value = '4';
        });

        document.getElementById('bulkGrades').value = '';
        showFeedback(feedback, t('bulkSuccess', grades.length), true);
    }

    function showFeedback(el, msg, success) {
        el.textContent = msg;
        el.className = 'import-feedback ' + (success ? 'success' : 'error');
        el.style.display = 'block';
    }

    function copyScriptToClipboard(btn) {
        const pre = document.getElementById('gradebookScript');
        // Decode HTML entities back to real JS
        const text = pre.textContent;
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = t('copiedBtn');
            setTimeout(() => { btn.textContent = t('copyBtn'); }, 2000);
        });
    }

    /* ─── Help modal ─── */

    function openHelp() {
        document.getElementById('helpModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeHelp() {
        document.getElementById('helpModal').classList.remove('open');
        document.body.style.overflow = '';
    }

    function handleBackdropClick(e) {
        if (e.target === document.getElementById('helpModal')) closeHelp();
    }

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHelp(); });

    /* ─── Init ─── */
    applyTranslations();
    addCourse();
    addCourse();
    addCourse();
