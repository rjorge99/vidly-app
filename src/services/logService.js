// import { BrowserTracing } from '@sentry/tracing';
// import * as Sentry from '@sentry/react';

const init = () => {
    // Sentry.init({
    //     dsn: 'https://771d41b429b3488f933f8ed0998f3ee1@o1207066.ingest.sentry.io/6340500',
    //     integrations: [new BrowserTracing()],
    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0
    // });
};

const log = (error) => {
    console.log(error);
    // Sentry.captureException(error);
};

export default {
    init,
    log
};
