import { NextRequest } from "next/server";

/**
 * 
 * @param {NextRequest} request 
 * @param {import("next").NextPageContext} context 
 */
export async function POST(request, context) {
    console.lognetweb
}

const data = {
    object_kind: 'issue',
    event_type: 'issue',
    user: {
        id: 44,
        name: 'vikas kumar',
        username: 'vikas.kumar',
        avatar_url:
            'https://gitlab.skylus.local/uploads/-/system/user/avatar/44/avatar.png',
        email: '[REDACTED]'
    },
    project: {
        id: 130,
        name: 'core-application',
        description: null,
        web_url: 'https://gitlab.skylus.local/tka/core-app',
        avatar_url: null,
        git_ssh_url: 'git@gitlab.skylus.local:tka/core-app.git',
        git_http_url: 'https://gitlab.skylus.local/tka/core-app.git',
        namespace: 'Tyrone Kubyts Appliance',
        visibility_level: 0,
        path_with_namespace: 'tka/core-app',
        default_branch: 'main',
        ci_config_path: null,
        homepage: 'https://gitlab.skylus.local/tka/core-app',
        url: 'git@gitlab.skylus.local:tka/core-app.git',
        ssh_url: 'git@gitlab.skylus.local:tka/core-app.git',
        http_url: 'https://gitlab.skylus.local/tka/core-app.git'
    },
    object_attributes: {
        author_id: 6,
        closed_at: '2024-04-26T14:58:35.782+05:30',
        confidential: false,
        created_at: '2024-04-26T14:56:44.432+05:30',
        description: '',
        discussion_locked: null,
        due_date: null,
        id: 1874,
        iid: 501,
        last_edited_at: null,
        last_edited_by_id: null,
        milestone_id: null,
        moved_to_id: null,
        duplicated_to_id: null,
        project_id: 130,
        relative_position: 255987,
        state_id: 2,
        time_estimate: 0,
        title: 'attach network list and form',
        updated_at: '2024-04-26T14:58:35.861+05:30',
        updated_by_id: null,
        weight: null,
        health_status: null,
        url: 'https://gitlab.skylus.local/tka/core-app/-/issues/501',
        total_time_spent: 0,
        time_change: 0,
        human_total_time_spent: null,
        human_time_change: null,
        human_time_estimate: null,
        assignee_ids: [15],
        assignee_id: 15,
        labels: [
            {
                id: 269,
                title: 'service: frontend-ui',
                color: '#eee600',
                project_id: 130,
                created_at: '2024-02-19T13:30:48.948+05:30',
                updated_at: '2024-02-19T13:30:48.948+05:30',
                template: false,
                description: null,
                type: 'ProjectLabel',
                group_id: null,
                lock_on_merge: false
            },
            {
                id: 263,
                title: 'status: finished',
                color: '#009966',
                project_id: 130,
                created_at: '2024-02-06T11:46:30.019+05:30',
                updated_at: '2024-02-06T11:46:30.019+05:30',
                template: false,
                description: '',
                type: 'ProjectLabel',
                group_id: null,
                lock_on_merge: false
            },
            {
                id: 250,
                title: 'type: design',
                color: '#6699cc',
                project_id: 130,
                created_at: '2024-02-06T11:36:37.174+05:30',
                updated_at: '2024-02-06T11:36:37.174+05:30',
                template: false,
                description:
                    'Describes issues that are pertaining to the design of UI/UX of the application',
                type: 'ProjectLabel',
                group_id: null,
                lock_on_merge: false
            }
        ],
        state: 'closed',
        severity: 'unknown',
        customer_relations_contacts: []
    },
    labels: [
        {
            id: 269,
            title: 'service: frontend-ui',
            color: '#eee600',
            project_id: 130,
            created_at: '2024-02-19T13:30:48.948+05:30',
            updated_at: '2024-02-19T13:30:48.948+05:30',
            template: false,
            description: null,
            type: 'ProjectLabel',
            group_id: null,
            lock_on_merge: false
        },
        {
            id: 263,
            title: 'status: finished',
            color: '#009966',
            project_id: 130,
            created_at: '2024-02-06T11:46:30.019+05:30',
            updated_at: '2024-02-06T11:46:30.019+05:30',
            template: false,
            description: '',
            type: 'ProjectLabel',
            group_id: null,
            lock_on_merge: false
        },
        {
            id: 250,
            title: 'type: design',
            color: '#6699cc',
            project_id: 130,
            created_at: '2024-02-06T11:36:37.174+05:30',
            updated_at: '2024-02-06T11:36:37.174+05:30',
            template: false,
            description:
                'Describes issues that are pertaining to the design of UI/UX of the application',
            type: 'ProjectLabel',
            group_id: null,
            lock_on_merge: false
        }
    ],
    changes: {},
    repository: {
        name: 'core-application',
        url: 'git@gitlab.skylus.local:tka/core-app.git',
        description: null,
        homepage: 'https://gitlab.skylus.local/tka/core-app'
    },
    assignees: [
        {
            id: 15,
            name: 'sajan jha',
            username: 'SajanJha',
            avatar_url:
                'https://secure.gravatar.com/avatar/ed4f6d636881d8161a0d715dc9f3cb580a0527b710a8fa9be46971a001763682?s=80&d=identicon',
            email: '[REDACTED]'
        }
    ]
}