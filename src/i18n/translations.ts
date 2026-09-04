import type { DateNames, LanguageCode } from './types';

type Dict = Record<string, string>;

const mk: Dict = {
  'tab.today': 'Денес',
  'tab.tomorrow': 'Утре',
  'tab.week': '7 дена',
  'tab.settings': 'Подесувања',
  'header.updatedAt': 'ажурирано во {time}',
  'header.refresh': 'Освежи',
  loading: 'Преземам прогноза…',
  'error.title': 'Прогнозата не е достапна',
  'error.offline':
    'Нема интернет конекција. Провери ги мобилните податоци или Wi-Fi.',
  'error.timeout': 'Серверот не одговори навреме. Обиди се повторно.',
  'error.http': 'Временската служба моментално не е достапна.',
  'error.malformed': 'Добиени се неисправни податоци од временската служба.',
  'error.unexpected': 'Настана неочекувана грешка при преземање на прогнозата.',
  'error.noDay': 'Нема податоци за овој ден',
  metrics: 'Показатели',
  details: 'Детали',
  notifications: 'Известувања',
  nextReminder: 'Следно потсетување: {date} во {time} ч.',
  reminderNotScheduled:
    'Дневното потсетување во {time} сè уште не е закажано.',
  reminderSkippedSafe:
    'Утре е безбедно — нема известување. Ќе добиеш само ако е жолто или црвено.',
  exactAlarm: 'Дозволи точни аларми за прецизно потсетување во {time}',
  weekTitle: 'Следни 7 дена',
  'severity.safe.label': 'БЕЗБЕДНО',
  'severity.safe.verdict': 'Земи го моторот',
  'severity.safe.short': 'Безбедно',
  'severity.warning.label': 'ВНИМАНИЕ',
  'severity.warning.verdict': 'Вози претпазливо',
  'severity.warning.short': 'Внимание',
  'severity.danger.label': 'ОПАСНО',
  'severity.danger.verdict': 'Остави го моторот дома',
  'severity.danger.short': 'Опасно',
  'metric.rain': 'Веројатност за дожд',
  'metric.wind': 'Удари на ветер',
  'metric.minTemp': 'Мин. температура',
  'metric.maxTemp': 'Макс. температура',
  'metric.rainLimit': 'внимание {warn}% · опасно {danger}%',
  'metric.limit': 'лимит {value}',
  'metric.dailyMax': 'дневен максимум',
  'week.rainWind': 'Дожд {rain}% · Ветер {wind} km/h',
  'reason.dangerRain':
    'Лошо време доаѓа: голема веројатност за дожд — асфалтот ќе биде лизгав.',
  'reason.dangerWind':
    'Лошо време доаѓа: силни удари на ветер — опасно за возило на два трака.',
  'reason.warningRain':
    'Слаб дожд се очекува — улиците ќе бидат влажни, вози претпазливо.',
  'reason.warningCold':
    'Ниска температура — гумите тешко се загреваат и приклонот е послаб.',
  'reason.safe': 'Условите се поволни за возење мотор.',
  'detail.heavyRain':
    'Дожд: {value}% веројатност (опасно над {limit}%) — лизгав асфалт.',
  'detail.lightRain':
    'Слаб дожд: {value}% веројатност (внимание над {limit}%) — влажни улици.',
  'detail.wind':
    'Ветер: удари до {value} km/h (лимит {limit} km/h) — страничен ветер го дестабилизира моторот.',
  'detail.cold':
    'Температура: минимум {value}°C (лимит {limit}°C) — ладни гуми и слаб приклон.',
  'detail.safeRain': 'Дожд: {value}% — под лимитот.',
  'detail.safeWind': 'Ветер: удари до {value} km/h — под лимитот.',
  'detail.safeTemp': 'Температура: {min}°C до {max}°C — во безбеден опсег.',
  'notify.dangerTitle': '🔴 Лошо време доаѓа — остави го моторот',
  'notify.warningTitle': '🟡 Внимание за утре — вози претпазливо',
  'notify.safeTitle': '🟢 Утре е за мотор',
  'notify.dangerBody':
    'Внимание за утре: Неповолни услови за мотор во {city}. Остави го моторот дома! ({metrics})',
  'notify.warningBody': 'Внимание за утре: {reason} ({metrics})',
  'notify.safeBody': 'Поволни услови во {city}. {metrics}',
  'notify.metrics': 'Дожд {rain}% · Ветер {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Предупредувања за возење',
  'notify.channelDesc':
    'Дневна проценка дали утре е безбедно за возење мотор.',
  'settings.timeTitle': 'Време на потсетување',
  'settings.timeHint':
    'Прогнозата се освежува секој ден. Известување добиваш само ако утре е жолто или црвено.',
  'settings.languageTitle': 'Јазик',
  'settings.languageHint': 'Избери го јазикот на апликацијата.',
  'settings.locationTitle': 'Локација',
  'settings.locationHint':
    'Прогнозата се влече според моменталната GPS позиција на телефонот.',
  'settings.usingFallback':
    'Локацијата не е достапна. Се користи последната позната позиција.',
  'settings.hour': 'Час',
  'settings.minute': 'Минута',
};

const en: Dict = {
  'tab.today': 'Today',
  'tab.tomorrow': 'Tomorrow',
  'tab.week': '7 days',
  'tab.settings': 'Settings',
  'header.updatedAt': 'updated at {time}',
  'header.refresh': 'Refresh',
  loading: 'Fetching forecast…',
  'error.title': 'Forecast unavailable',
  'error.offline': 'No internet connection. Check mobile data or Wi-Fi.',
  'error.timeout': 'The weather service timed out. Try again.',
  'error.http': 'The weather service is currently unavailable.',
  'error.malformed': 'The weather service returned unusable data.',
  'error.unexpected': 'Something went wrong while fetching the forecast.',
  'error.noDay': 'No data for this day',
  metrics: 'Indicators',
  details: 'Details',
  notifications: 'Notifications',
  nextReminder: 'Next reminder: {date} at {time}',
  reminderNotScheduled: 'The daily reminder at {time} is not scheduled yet.',
  reminderSkippedSafe:
    'Tomorrow is safe — no notification. You only get one for yellow or red.',
  exactAlarm: 'Allow exact alarms so the reminder can fire at {time}',
  weekTitle: 'Next 7 days',
  'severity.safe.label': 'SAFE',
  'severity.safe.verdict': 'Take the bike',
  'severity.safe.short': 'Safe',
  'severity.warning.label': 'CAUTION',
  'severity.warning.verdict': 'Ride carefully',
  'severity.warning.short': 'Caution',
  'severity.danger.label': 'DANGER',
  'severity.danger.verdict': 'Leave the bike at home',
  'severity.danger.short': 'Danger',
  'metric.rain': 'Rain chance',
  'metric.wind': 'Wind gusts',
  'metric.minTemp': 'Min. temperature',
  'metric.maxTemp': 'Max. temperature',
  'metric.rainLimit': 'caution {warn}% · danger {danger}%',
  'metric.limit': 'limit {value}',
  'metric.dailyMax': 'daily maximum',
  'week.rainWind': 'Rain {rain}% · Wind {wind} km/h',
  'reason.dangerRain':
    'Bad weather incoming: high chance of rain — the tarmac will be slippery.',
  'reason.dangerWind':
    'Bad weather incoming: strong gusts — dangerous for a two-wheeler.',
  'reason.warningRain':
    'Light rain expected — streets will be damp, ride carefully.',
  'reason.warningCold':
    'Low temperature — tyres stay cold and grip drops.',
  'reason.safe': 'Conditions are good for riding.',
  'detail.heavyRain':
    'Rain: {value}% chance (danger above {limit}%) — slippery asphalt.',
  'detail.lightRain':
    'Light rain: {value}% chance (caution above {limit}%) — damp streets.',
  'detail.wind':
    'Wind: gusts up to {value} km/h (limit {limit} km/h) — crosswinds destabilise the bike.',
  'detail.cold':
    'Temperature: min {value}°C (limit {limit}°C) — cold tyres and weaker grip.',
  'detail.safeRain': 'Rain: {value}% — under the limit.',
  'detail.safeWind': 'Wind: gusts up to {value} km/h — under the limit.',
  'detail.safeTemp': 'Temperature: {min}°C to {max}°C — in a safe range.',
  'notify.dangerTitle': '🔴 Bad weather incoming — leave the bike',
  'notify.warningTitle': '🟡 Caution tomorrow — ride carefully',
  'notify.safeTitle': '🟢 Tomorrow is good for riding',
  'notify.dangerBody':
    'Warning for tomorrow: Poor riding conditions in {city}. Leave the bike at home! ({metrics})',
  'notify.warningBody': 'Warning for tomorrow: {reason} ({metrics})',
  'notify.safeBody': 'Good conditions in {city}. {metrics}',
  'notify.metrics': 'Rain {rain}% · Wind {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Ride alerts',
  'notify.channelDesc': 'Daily check of whether tomorrow is safe to ride.',
  'settings.timeTitle': 'Reminder time',
  'settings.timeHint':
    'The forecast refreshes every day. You only get a notification if tomorrow is yellow or red.',
  'settings.languageTitle': 'Language',
  'settings.languageHint': 'Choose the language of the app.',
  'settings.locationTitle': 'Location',
  'settings.locationHint':
    'The forecast is fetched for the phone’s current GPS position.',
  'settings.usingFallback':
    'Location is unavailable. Using the last known position.',
  'settings.hour': 'Hour',
  'settings.minute': 'Minute',
};

const de: Dict = {
  'tab.today': 'Heute',
  'tab.tomorrow': 'Morgen',
  'tab.week': '7 Tage',
  'tab.settings': 'Einstellungen',
  'header.updatedAt': 'aktualisiert um {time}',
  'header.refresh': 'Aktualisieren',
  loading: 'Wetter wird geladen…',
  'error.title': 'Vorhersage nicht verfügbar',
  'error.offline': 'Keine Internetverbindung. Prüfe Mobilfunk oder WLAN.',
  'error.timeout': 'Der Wetterdienst hat nicht geantwortet. Bitte erneut versuchen.',
  'error.http': 'Der Wetterdienst ist derzeit nicht erreichbar.',
  'error.malformed': 'Ungültige Daten vom Wetterdienst erhalten.',
  'error.unexpected': 'Beim Laden der Vorhersage ist ein Fehler aufgetreten.',
  'error.noDay': 'Keine Daten für diesen Tag',
  metrics: 'Kennzahlen',
  details: 'Details',
  notifications: 'Benachrichtigungen',
  nextReminder: 'Nächste Erinnerung: {date} um {time} Uhr',
  reminderNotScheduled:
    'Die tägliche Erinnerung um {time} Uhr ist noch nicht geplant.',
  reminderSkippedSafe:
    'Morgen ist sicher — keine Benachrichtigung. Nur bei Gelb oder Rot.',
  exactAlarm: 'Exakte Alarme erlauben, damit die Erinnerung um {time} Uhr kommt',
  weekTitle: 'Nächste 7 Tage',
  'severity.safe.label': 'SICHER',
  'severity.safe.verdict': 'Nimm das Motorrad',
  'severity.safe.short': 'Sicher',
  'severity.warning.label': 'VORSICHT',
  'severity.warning.verdict': 'Vorsichtig fahren',
  'severity.warning.short': 'Vorsicht',
  'severity.danger.label': 'GEFAHR',
  'severity.danger.verdict': 'Motorrad stehen lassen',
  'severity.danger.short': 'Gefahr',
  'metric.rain': 'Regenwahrscheinlichkeit',
  'metric.wind': 'Windböen',
  'metric.minTemp': 'Min. Temperatur',
  'metric.maxTemp': 'Max. Temperatur',
  'metric.rainLimit': 'Vorsicht {warn}% · Gefahr {danger}%',
  'metric.limit': 'Grenze {value}',
  'metric.dailyMax': 'Tagesmaximum',
  'week.rainWind': 'Regen {rain}% · Wind {wind} km/h',
  'reason.dangerRain':
    'Schlechtes Wetter kommt: hohe Regenwahrscheinlichkeit — die Straße wird glatt.',
  'reason.dangerWind':
    'Schlechtes Wetter kommt: starke Böen — gefährlich für Zweiräder.',
  'reason.warningRain':
    'Leichter Regen erwartet — Straßen werden nass, vorsichtig fahren.',
  'reason.warningCold':
    'Niedrige Temperatur — Reifen bleiben kalt, weniger Grip.',
  'reason.safe': 'Gute Bedingungen zum Motorradfahren.',
  'detail.heavyRain':
    'Regen: {value}% Wahrscheinlichkeit (Gefahr über {limit}%) — glatter Asphalt.',
  'detail.lightRain':
    'Leichter Regen: {value}% (Vorsicht über {limit}%) — nasse Straßen.',
  'detail.wind':
    'Wind: Böen bis {value} km/h (Grenze {limit} km/h) — Seitenwind destabilisiert.',
  'detail.cold':
    'Temperatur: min. {value}°C (Grenze {limit}°C) — kalte Reifen, weniger Grip.',
  'detail.safeRain': 'Regen: {value}% — unter der Grenze.',
  'detail.safeWind': 'Wind: Böen bis {value} km/h — unter der Grenze.',
  'detail.safeTemp': 'Temperatur: {min}°C bis {max}°C — im sicheren Bereich.',
  'notify.dangerTitle': '🔴 Schlechtes Wetter — Motorrad stehen lassen',
  'notify.warningTitle': '🟡 Vorsicht morgen — vorsichtig fahren',
  'notify.safeTitle': '🟢 Morgen ist gut zum Fahren',
  'notify.dangerBody':
    'Warnung für morgen: Schlechte Bedingungen in {city}. Motorrad stehen lassen! ({metrics})',
  'notify.warningBody': 'Warnung für morgen: {reason} ({metrics})',
  'notify.safeBody': 'Gute Bedingungen in {city}. {metrics}',
  'notify.metrics': 'Regen {rain}% · Wind {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Fahrwarnungen',
  'notify.channelDesc': 'Tägliche Prüfung, ob morgen das Motorrad sicher ist.',
  'settings.timeTitle': 'Erinnerungszeit',
  'settings.timeHint':
    'Die Vorhersage wird jeden Tag aktualisiert. Eine Benachrichtigung kommt nur bei Gelb oder Rot.',
  'settings.languageTitle': 'Sprache',
  'settings.languageHint': 'Wähle die Sprache der App.',
  'settings.locationTitle': 'Standort',
  'settings.locationHint':
    'Die Vorhersage gilt für den aktuellen GPS-Standort des Telefons.',
  'settings.usingFallback':
    'Standort nicht verfügbar. Letzte bekannte Position wird verwendet.',
  'settings.hour': 'Stunde',
  'settings.minute': 'Minute',
};

const it: Dict = {
  'tab.today': 'Oggi',
  'tab.tomorrow': 'Domani',
  'tab.week': '7 giorni',
  'tab.settings': 'Impostazioni',
  'header.updatedAt': 'aggiornato alle {time}',
  'header.refresh': 'Aggiorna',
  loading: 'Carico le previsioni…',
  'error.title': 'Previsioni non disponibili',
  'error.offline': 'Nessuna connessione. Controlla i dati mobili o il Wi-Fi.',
  'error.timeout': 'Il servizio meteo non ha risposto. Riprova.',
  'error.http': 'Il servizio meteo non è disponibile al momento.',
  'error.malformed': 'Dati meteo non validi.',
  'error.unexpected': 'Errore imprevisto durante il caricamento delle previsioni.',
  'error.noDay': 'Nessun dato per questo giorno',
  metrics: 'Indicatori',
  details: 'Dettagli',
  notifications: 'Notifiche',
  nextReminder: 'Prossimo promemoria: {date} alle {time}',
  reminderNotScheduled: 'Il promemoria giornaliero alle {time} non è ancora impostato.',
  reminderSkippedSafe:
    'Domani è sicuro — nessuna notifica. Solo per giallo o rosso.',
  exactAlarm: 'Consenti allarmi esatti per il promemoria alle {time}',
  weekTitle: 'Prossimi 7 giorni',
  'severity.safe.label': 'SICURO',
  'severity.safe.verdict': 'Prendi la moto',
  'severity.safe.short': 'Sicuro',
  'severity.warning.label': 'ATTENZIONE',
  'severity.warning.verdict': 'Guida con cautela',
  'severity.warning.short': 'Attenzione',
  'severity.danger.label': 'PERICOLO',
  'severity.danger.verdict': 'Lascia la moto a casa',
  'severity.danger.short': 'Pericolo',
  'metric.rain': 'Probabilità di pioggia',
  'metric.wind': 'Raffiche di vento',
  'metric.minTemp': 'Temp. minima',
  'metric.maxTemp': 'Temp. massima',
  'metric.rainLimit': 'attenzione {warn}% · pericolo {danger}%',
  'metric.limit': 'limite {value}',
  'metric.dailyMax': 'massimo giornaliero',
  'week.rainWind': 'Pioggia {rain}% · Vento {wind} km/h',
  'reason.dangerRain':
    'Arriva brutto tempo: alta probabilità di pioggia — asfalto scivoloso.',
  'reason.dangerWind':
    'Arriva brutto tempo: raffiche forti — pericoloso per una due ruote.',
  'reason.warningRain':
    'Pioggia leggera prevista — strade umide, guida con cautela.',
  'reason.warningCold':
    'Temperatura bassa — le gomme restano fredde e l’aderenza cala.',
  'reason.safe': 'Condizioni buone per andare in moto.',
  'detail.heavyRain':
    'Pioggia: {value}% (pericolo sopra {limit}%) — asfalto scivoloso.',
  'detail.lightRain':
    'Pioggia leggera: {value}% (attenzione sopra {limit}%) — strade umide.',
  'detail.wind':
    'Vento: raffiche fino a {value} km/h (limite {limit} km/h) — vento laterale instabile.',
  'detail.cold':
    'Temperatura: min {value}°C (limite {limit}°C) — gomme fredde, meno grip.',
  'detail.safeRain': 'Pioggia: {value}% — sotto il limite.',
  'detail.safeWind': 'Vento: raffiche fino a {value} km/h — sotto il limite.',
  'detail.safeTemp': 'Temperatura: {min}°C–{max}°C — nella fascia sicura.',
  'notify.dangerTitle': '🔴 Arriva brutto tempo — lascia la moto',
  'notify.warningTitle': '🟡 Attenzione per domani — guida con cautela',
  'notify.safeTitle': '🟢 Domani si può andare in moto',
  'notify.dangerBody':
    'Attenzione per domani: condizioni scarse a {city}. Lascia la moto a casa! ({metrics})',
  'notify.warningBody': 'Attenzione per domani: {reason} ({metrics})',
  'notify.safeBody': 'Buone condizioni a {city}. {metrics}',
  'notify.metrics': 'Pioggia {rain}% · Vento {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Avvisi di guida',
  'notify.channelDesc': 'Controllo quotidiano se domani è sicuro andare in moto.',
  'settings.timeTitle': 'Orario del promemoria',
  'settings.timeHint':
    'Le previsioni si aggiornano ogni giorno. Notifica solo se domani è giallo o rosso.',
  'settings.languageTitle': 'Lingua',
  'settings.languageHint': 'Scegli la lingua dell’app.',
  'settings.locationTitle': 'Posizione',
  'settings.locationHint':
    'Le previsioni usano la posizione GPS attuale del telefono.',
  'settings.usingFallback':
    'Posizione non disponibile. Si usa l’ultima posizione nota.',
  'settings.hour': 'Ora',
  'settings.minute': 'Minuto',
};

const fr: Dict = {
  'tab.today': 'Auj.',
  'tab.tomorrow': 'Demain',
  'tab.week': '7 jours',
  'tab.settings': 'Réglages',
  'header.updatedAt': 'mis à jour à {time}',
  'header.refresh': 'Actualiser',
  loading: 'Chargement des prévisions…',
  'error.title': 'Prévisions indisponibles',
  'error.offline': 'Pas d’internet. Vérifie les données mobiles ou le Wi-Fi.',
  'error.timeout': 'Le service météo n’a pas répondu. Réessaie.',
  'error.http': 'Le service météo est indisponible pour le moment.',
  'error.malformed': 'Données météo invalides.',
  'error.unexpected': 'Erreur inattendue lors du chargement des prévisions.',
  'error.noDay': 'Pas de données pour ce jour',
  metrics: 'Indicateurs',
  details: 'Détails',
  notifications: 'Notifications',
  nextReminder: 'Prochain rappel : {date} à {time}',
  reminderNotScheduled: 'Le rappel quotidien à {time} n’est pas encore programmé.',
  reminderSkippedSafe:
    'Demain est sûr — pas de notification. Uniquement en jaune ou rouge.',
  exactAlarm: 'Autoriser les alarmes exactes pour le rappel à {time}',
  weekTitle: '7 prochains jours',
  'severity.safe.label': 'SÛR',
  'severity.safe.verdict': 'Prends la moto',
  'severity.safe.short': 'Sûr',
  'severity.warning.label': 'ATTENTION',
  'severity.warning.verdict': 'Roule prudemment',
  'severity.warning.short': 'Attention',
  'severity.danger.label': 'DANGER',
  'severity.danger.verdict': 'Laisse la moto à la maison',
  'severity.danger.short': 'Danger',
  'metric.rain': 'Risque de pluie',
  'metric.wind': 'Rafales de vent',
  'metric.minTemp': 'Temp. min.',
  'metric.maxTemp': 'Temp. max.',
  'metric.rainLimit': 'attention {warn}% · danger {danger}%',
  'metric.limit': 'seuil {value}',
  'metric.dailyMax': 'maximum du jour',
  'week.rainWind': 'Pluie {rain}% · Vent {wind} km/h',
  'reason.dangerRain':
    'Mauvais temps en approche : forte chance de pluie — chaussée glissante.',
  'reason.dangerWind':
    'Mauvais temps en approche : fortes rafales — dangereux à deux roues.',
  'reason.warningRain':
    'Pluie légère prévue — routes humides, roule prudemment.',
  'reason.warningCold':
    'Température basse — pneus froids et moins d’adhérence.',
  'reason.safe': 'Bonnes conditions pour rouler.',
  'detail.heavyRain':
    'Pluie : {value}% (danger au-dessus de {limit}%) — asphalte glissant.',
  'detail.lightRain':
    'Pluie légère : {value}% (attention au-dessus de {limit}%) — routes humides.',
  'detail.wind':
    'Vent : rafales jusqu’à {value} km/h (seuil {limit} km/h) — vent de travers.',
  'detail.cold':
    'Température : min. {value}°C (seuil {limit}°C) — pneus froids.',
  'detail.safeRain': 'Pluie : {value}% — sous le seuil.',
  'detail.safeWind': 'Vent : rafales jusqu’à {value} km/h — sous le seuil.',
  'detail.safeTemp': 'Température : {min}°C à {max}°C — plage sûre.',
  'notify.dangerTitle': '🔴 Mauvais temps — laisse la moto',
  'notify.warningTitle': '🟡 Attention demain — roule prudemment',
  'notify.safeTitle': '🟢 Demain, on peut rouler',
  'notify.dangerBody':
    'Attention pour demain : mauvaises conditions à {city}. Laisse la moto ! ({metrics})',
  'notify.warningBody': 'Attention pour demain : {reason} ({metrics})',
  'notify.safeBody': 'Bonnes conditions à {city}. {metrics}',
  'notify.metrics': 'Pluie {rain}% · Vent {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Alertes moto',
  'notify.channelDesc': 'Vérification quotidienne : demain, on peut rouler ?',
  'settings.timeTitle': 'Heure du rappel',
  'settings.timeHint':
    'Les prévisions se mettent à jour chaque jour. Notification seulement si demain est jaune ou rouge.',
  'settings.languageTitle': 'Langue',
  'settings.languageHint': 'Choisis la langue de l’application.',
  'settings.locationTitle': 'Position',
  'settings.locationHint':
    'Les prévisions utilisent la position GPS actuelle du téléphone.',
  'settings.usingFallback':
    'Position indisponible. Dernière position connue utilisée.',
  'settings.hour': 'Heure',
  'settings.minute': 'Minute',
};

const ru: Dict = {
  'tab.today': 'Сегодня',
  'tab.tomorrow': 'Завтра',
  'tab.week': '7 дней',
  'tab.settings': 'Настройки',
  'header.updatedAt': 'обновлено в {time}',
  'header.refresh': 'Обновить',
  loading: 'Загружаю прогноз…',
  'error.title': 'Прогноз недоступен',
  'error.offline': 'Нет интернета. Проверь мобильные данные или Wi-Fi.',
  'error.timeout': 'Служба погоды не ответила. Попробуй ещё раз.',
  'error.http': 'Служба погоды сейчас недоступна.',
  'error.malformed': 'Получены некорректные данные о погоде.',
  'error.unexpected': 'Неожиданная ошибка при загрузке прогноза.',
  'error.noDay': 'Нет данных на этот день',
  metrics: 'Показатели',
  details: 'Подробности',
  notifications: 'Уведомления',
  nextReminder: 'Следующее напоминание: {date} в {time}',
  reminderNotScheduled: 'Ежедневное напоминание в {time} ещё не запланировано.',
  reminderSkippedSafe:
    'Завтра безопасно — уведомления не будет. Только при жёлтом или красном.',
  exactAlarm: 'Разреши точные будильники, чтобы напоминание пришло в {time}',
  weekTitle: 'Следующие 7 дней',
  'severity.safe.label': 'БЕЗОПАСНО',
  'severity.safe.verdict': 'Бери мотоцикл',
  'severity.safe.short': 'Безопасно',
  'severity.warning.label': 'ОСТОРОЖНО',
  'severity.warning.verdict': 'Едь аккуратно',
  'severity.warning.short': 'Осторожно',
  'severity.danger.label': 'ОПАСНО',
  'severity.danger.verdict': 'Оставь мотоцикл дома',
  'severity.danger.short': 'Опасно',
  'metric.rain': 'Вероятность дождя',
  'metric.wind': 'Порывы ветра',
  'metric.minTemp': 'Мин. температура',
  'metric.maxTemp': 'Макс. температура',
  'metric.rainLimit': 'осторожно {warn}% · опасно {danger}%',
  'metric.limit': 'лимит {value}',
  'metric.dailyMax': 'дневной максимум',
  'week.rainWind': 'Дождь {rain}% · Ветер {wind} km/h',
  'reason.dangerRain':
    'Приближается непогода: высокая вероятность дождя — асфальт будет скользким.',
  'reason.dangerWind':
    'Приближается непогода: сильные порывы — опасно для двухколёсного.',
  'reason.warningRain':
    'Ожидается лёгкий дождь — улицы будут влажными, едь аккуратно.',
  'reason.warningCold':
    'Низкая температура — шины холодные, сцепление хуже.',
  'reason.safe': 'Условия хорошие для поездки.',
  'detail.heavyRain':
    'Дождь: {value}% (опасно выше {limit}%) — скользкий асфальт.',
  'detail.lightRain':
    'Лёгкий дождь: {value}% (осторожно выше {limit}%) — влажные улицы.',
  'detail.wind':
    'Ветер: порывы до {value} km/h (лимит {limit} km/h) — боковой ветер.',
  'detail.cold':
    'Температура: мин. {value}°C (лимит {limit}°C) — холодные шины.',
  'detail.safeRain': 'Дождь: {value}% — ниже лимита.',
  'detail.safeWind': 'Ветер: порывы до {value} km/h — ниже лимита.',
  'detail.safeTemp': 'Температура: {min}°C–{max}°C — в безопасном диапазоне.',
  'notify.dangerTitle': '🔴 Непогода — оставь мотоцикл',
  'notify.warningTitle': '🟡 Осторожно завтра — едь аккуратно',
  'notify.safeTitle': '🟢 Завтра можно ехать',
  'notify.dangerBody':
    'Внимание на завтра: плохие условия в {city}. Оставь мотоцикл дома! ({metrics})',
  'notify.warningBody': 'Внимание на завтра: {reason} ({metrics})',
  'notify.safeBody': 'Хорошие условия в {city}. {metrics}',
  'notify.metrics': 'Дождь {rain}% · Ветер {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Предупреждения о поездке',
  'notify.channelDesc': 'Ежедневная проверка: можно ли завтра ехать.',
  'settings.timeTitle': 'Время напоминания',
  'settings.timeHint':
    'Прогноз обновляется каждый день. Уведомление только если завтра жёлтое или красное.',
  'settings.languageTitle': 'Язык',
  'settings.languageHint': 'Выбери язык приложения.',
  'settings.locationTitle': 'Местоположение',
  'settings.locationHint':
    'Прогноз берётся по текущим GPS-координатам телефона.',
  'settings.usingFallback':
    'Местоположение недоступно. Используется последняя известная позиция.',
  'settings.hour': 'Час',
  'settings.minute': 'Минута',
};

const sr: Dict = {
  'tab.today': 'Danas',
  'tab.tomorrow': 'Sutra',
  'tab.week': '7 dana',
  'tab.settings': 'Podešavanja',
  'header.updatedAt': 'ažurirano u {time}',
  'header.refresh': 'Osveži',
  loading: 'Preuzimam prognozu…',
  'error.title': 'Prognoza nije dostupna',
  'error.offline': 'Nema interneta. Proveri mobilne podatke ili Wi-Fi.',
  'error.timeout': 'Servis vremena nije odgovorio. Pokušaj ponovo.',
  'error.http': 'Servis vremena trenutno nije dostupan.',
  'error.malformed': 'Primljeni su neispravni podaci o vremenu.',
  'error.unexpected': 'Neočekivana greška pri preuzimanju prognoze.',
  'error.noDay': 'Nema podataka za ovaj dan',
  metrics: 'Pokazatelji',
  details: 'Detalji',
  notifications: 'Obaveštenja',
  nextReminder: 'Sledeći podsetnik: {date} u {time} h.',
  reminderNotScheduled: 'Dnevni podsetnik u {time} još nije zakazan.',
  reminderSkippedSafe:
    'Sutra je bezbedno — nema obaveštenja. Samo za žuto ili crveno.',
  exactAlarm: 'Dozvoli tačne alarme za podsetnik u {time}',
  weekTitle: 'Narednih 7 dana',
  'severity.safe.label': 'BEZBEDNO',
  'severity.safe.verdict': 'Uzmi motor',
  'severity.safe.short': 'Bezbedno',
  'severity.warning.label': 'PAŽNJA',
  'severity.warning.verdict': 'Vozi oprezno',
  'severity.warning.short': 'Pažnja',
  'severity.danger.label': 'OPASNO',
  'severity.danger.verdict': 'Ostavi motor kod kuće',
  'severity.danger.short': 'Opasno',
  'metric.rain': 'Verovatnoća kiše',
  'metric.wind': 'Udari vetra',
  'metric.minTemp': 'Min. temperatura',
  'metric.maxTemp': 'Maks. temperatura',
  'metric.rainLimit': 'pažnja {warn}% · opasno {danger}%',
  'metric.limit': 'limit {value}',
  'metric.dailyMax': 'dnevni maksimum',
  'week.rainWind': 'Kiša {rain}% · Vetar {wind} km/h',
  'reason.dangerRain':
    'Dolazi loše vreme: velika verovatnoća kiše — asfalt će biti klizav.',
  'reason.dangerWind':
    'Dolazi loše vreme: jaki udari vetra — opasno za dva točka.',
  'reason.warningRain':
    'Očekuje se slaba kiša — ulice će biti vlažne, vozi oprezno.',
  'reason.warningCold':
    'Niska temperatura — gume ostaju hladne i prianjanje slabi.',
  'reason.safe': 'Uslovi su dobri za vožnju.',
  'detail.heavyRain':
    'Kiša: {value}% (opasno preko {limit}%) — klizav asfalt.',
  'detail.lightRain':
    'Slaba kiša: {value}% (pažnja preko {limit}%) — vlažne ulice.',
  'detail.wind':
    'Vetar: udari do {value} km/h (limit {limit} km/h) — bočni vetar.',
  'detail.cold':
    'Temperatura: min. {value}°C (limit {limit}°C) — hladne gume.',
  'detail.safeRain': 'Kiša: {value}% — ispod limita.',
  'detail.safeWind': 'Vetar: udari do {value} km/h — ispod limita.',
  'detail.safeTemp': 'Temperatura: {min}°C do {max}°C — u bezbednom opsegu.',
  'notify.dangerTitle': '🔴 Dolazi loše vreme — ostavi motor',
  'notify.warningTitle': '🟡 Pažnja za sutra — vozi oprezno',
  'notify.safeTitle': '🟢 Sutra je za motor',
  'notify.dangerBody':
    'Pažnja za sutra: Loši uslovi u {city}. Ostavi motor kod kuće! ({metrics})',
  'notify.warningBody': 'Pažnja za sutra: {reason} ({metrics})',
  'notify.safeBody': 'Dobri uslovi u {city}. {metrics}',
  'notify.metrics': 'Kiša {rain}% · Vetar {wind} km/h · {min}–{max}°C',
  'notify.channelName': 'Upozorenja za vožnju',
  'notify.channelDesc': 'Dnevna provera da li je sutra bezbedno za motor.',
  'settings.timeTitle': 'Vreme podsetnika',
  'settings.timeHint':
    'Prognoza se osvežava svakog dana. Obaveštenje samo ako je sutra žuto ili crveno.',
  'settings.languageTitle': 'Jezik',
  'settings.languageHint': 'Izaberi jezik aplikacije.',
  'settings.locationTitle': 'Lokacija',
  'settings.locationHint':
    'Prognoza se vuče prema trenutnoj GPS poziciji telefona.',
  'settings.usingFallback':
    'Lokacija nije dostupna. Koristi se poslednja poznata pozicija.',
  'settings.hour': 'Sat',
  'settings.minute': 'Minut',
};

export const MESSAGES: Record<LanguageCode, Dict> = {
  mk,
  en,
  de,
  it,
  fr,
  ru,
  sr,
};

export const DATE_NAMES: Record<LanguageCode, DateNames> = {
  mk: {
    weekdays: ['Недела', 'Понеделник', 'Вторник', 'Среда', 'Четврток', 'Петок', 'Сабота'],
    weekdaysShort: ['Нед', 'Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб'],
    months: ['јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември'],
    monthsShort: ['јан', 'фев', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'ное', 'дек'],
  },
  en: {
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  de: {
    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  },
  it: {
    weekdays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
    months: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    monthsShort: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  },
  fr: {
    weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    monthsShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  },
  ru: {
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    monthsShort: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  },
  sr: {
    weekdays: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
    weekdaysShort: ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'],
    months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
    monthsShort: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
  },
};
