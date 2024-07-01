import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;

}

export default function ActivityDashboard({ activities, selectedActivity,
    selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting }: Props) { /* { activities }: Props destructures prop: Props, so we no longer need prop.activities*/
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid.Column>
            <Grid.Column width="6"> {/*Total grid columns add up to 16*/}
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />} {/*&& means that the code on the right only runs if variable on left is not null*/}
                {editMode &&
                    <ActivityForm
                        createOrEdit={createOrEdit}
                        closeForm={closeForm}
                        activity={selectedActivity}
                        submitting={submitting}
                    />}
            </Grid.Column>
        </Grid>
    )
}