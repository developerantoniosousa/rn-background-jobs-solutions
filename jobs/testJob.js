import BackgroundJob from 'react-native-background-job';
import {AppState} from 'react-native';

import {store} from '../state/store';
import {Actions} from '../state/logs';

const JOB_KEY = 'testjob';
const JOB_PERIOD_IN_MILLIS = 1000 * 10;
const BACKGROUND_SCHEDULE = {
    jobKey: JOB_KEY,
    allowWhileIdle: true,
    period: JOB_PERIOD_IN_MILLIS,
    networkType: BackgroundJob.NETWORK_TYPE_UNMETERED,
};

export function testJob() {

    function job() {
        const log = {
            id: Math.random(),
            time: new Date().toISOString()
        }

        console.log({
            appState: AppState.currentState,
            log,
        })

        store.dispatch(Actions.addLog(log));
    }

    const backgroundJob = {
        jobKey: JOB_KEY,
        job
    };

    BackgroundJob.register(backgroundJob);

    return function schedule() {
        BackgroundJob.schedule(BACKGROUND_SCHEDULE)
            .then(() => console.log(`Job ${JOB_KEY} has been successfully scheduled`))
            .catch(err => console.err(err));
    }
}
