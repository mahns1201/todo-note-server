export declare class GithubService {
    private readonly octokit;
    constructor();
    private createOctokitInstance;
    callGitHubApi(url: string, githubToken: string, params?: object): Promise<any>;
    getProfile(githubToken: string): Promise<any>;
    getEmail(githubToken: string): Promise<string>;
    getRepos(githubToken: string): Promise<any>;
    getBranches(githubToken: string, owner: string, repo: string): Promise<{
        name: string;
        commit: {
            sha: string;
            url: string;
        };
        protected: boolean;
        protection?: {
            url?: string;
            enabled?: boolean;
            required_status_checks?: {
                url?: string;
                enforcement_level?: string;
                contexts: string[];
                checks: {
                    context: string;
                    app_id: number;
                }[];
                contexts_url?: string;
                strict?: boolean;
            };
            enforce_admins?: {
                url: string;
                enabled: boolean;
            };
            required_pull_request_reviews?: {
                url?: string;
                dismissal_restrictions?: {
                    users?: {
                        name?: string;
                        email?: string;
                        login: string;
                        id: number;
                        node_id: string;
                        avatar_url: string;
                        gravatar_id: string;
                        url: string;
                        html_url: string;
                        followers_url: string;
                        following_url: string;
                        gists_url: string;
                        starred_url: string;
                        subscriptions_url: string;
                        organizations_url: string;
                        repos_url: string;
                        events_url: string;
                        received_events_url: string;
                        type: string;
                        site_admin: boolean;
                        starred_at?: string;
                    }[];
                    teams?: {
                        id: number;
                        node_id: string;
                        name: string;
                        slug: string;
                        description: string;
                        privacy?: string;
                        notification_setting?: string;
                        permission: string;
                        permissions?: {
                            pull: boolean;
                            triage: boolean;
                            push: boolean;
                            maintain: boolean;
                            admin: boolean;
                        };
                        url: string;
                        html_url: string;
                        members_url: string;
                        repositories_url: string;
                        parent: {
                            id: number;
                            node_id: string;
                            url: string;
                            members_url: string;
                            name: string;
                            description: string;
                            permission: string;
                            privacy?: string;
                            notification_setting?: string;
                            html_url: string;
                            repositories_url: string;
                            slug: string;
                            ldap_dn?: string;
                        };
                    }[];
                    apps?: {
                        id: number;
                        slug?: string;
                        node_id: string;
                        owner: {
                            name?: string;
                            email?: string;
                            login: string;
                            id: number;
                            node_id: string;
                            avatar_url: string;
                            gravatar_id: string;
                            url: string;
                            html_url: string;
                            followers_url: string;
                            following_url: string;
                            gists_url: string;
                            starred_url: string;
                            subscriptions_url: string;
                            organizations_url: string;
                            repos_url: string;
                            events_url: string;
                            received_events_url: string;
                            type: string;
                            site_admin: boolean;
                            starred_at?: string;
                        };
                        name: string;
                        description: string;
                        external_url: string;
                        html_url: string;
                        created_at: string;
                        updated_at: string;
                        permissions: {
                            [key: string]: string;
                            issues?: string;
                            checks?: string;
                            metadata?: string;
                            contents?: string;
                            deployments?: string;
                        };
                        events: string[];
                        installations_count?: number;
                        client_id?: string;
                        client_secret?: string;
                        webhook_secret?: string;
                        pem?: string;
                    }[];
                    url?: string;
                    users_url?: string;
                    teams_url?: string;
                };
                bypass_pull_request_allowances?: {
                    users?: {
                        name?: string;
                        email?: string;
                        login: string;
                        id: number;
                        node_id: string;
                        avatar_url: string;
                        gravatar_id: string;
                        url: string;
                        html_url: string;
                        followers_url: string;
                        following_url: string;
                        gists_url: string;
                        starred_url: string;
                        subscriptions_url: string;
                        organizations_url: string;
                        repos_url: string;
                        events_url: string;
                        received_events_url: string;
                        type: string;
                        site_admin: boolean;
                        starred_at?: string;
                    }[];
                    teams?: {
                        id: number;
                        node_id: string;
                        name: string;
                        slug: string;
                        description: string;
                        privacy?: string;
                        notification_setting?: string;
                        permission: string;
                        permissions?: {
                            pull: boolean;
                            triage: boolean;
                            push: boolean;
                            maintain: boolean;
                            admin: boolean;
                        };
                        url: string;
                        html_url: string;
                        members_url: string;
                        repositories_url: string;
                        parent: {
                            id: number;
                            node_id: string;
                            url: string;
                            members_url: string;
                            name: string;
                            description: string;
                            permission: string;
                            privacy?: string;
                            notification_setting?: string;
                            html_url: string;
                            repositories_url: string;
                            slug: string;
                            ldap_dn?: string;
                        };
                    }[];
                    apps?: {
                        id: number;
                        slug?: string;
                        node_id: string;
                        owner: {
                            name?: string;
                            email?: string;
                            login: string;
                            id: number;
                            node_id: string;
                            avatar_url: string;
                            gravatar_id: string;
                            url: string;
                            html_url: string;
                            followers_url: string;
                            following_url: string;
                            gists_url: string;
                            starred_url: string;
                            subscriptions_url: string;
                            organizations_url: string;
                            repos_url: string;
                            events_url: string;
                            received_events_url: string;
                            type: string;
                            site_admin: boolean;
                            starred_at?: string;
                        };
                        name: string;
                        description: string;
                        external_url: string;
                        html_url: string;
                        created_at: string;
                        updated_at: string;
                        permissions: {
                            [key: string]: string;
                            issues?: string;
                            checks?: string;
                            metadata?: string;
                            contents?: string;
                            deployments?: string;
                        };
                        events: string[];
                        installations_count?: number;
                        client_id?: string;
                        client_secret?: string;
                        webhook_secret?: string;
                        pem?: string;
                    }[];
                };
                dismiss_stale_reviews: boolean;
                require_code_owner_reviews: boolean;
                required_approving_review_count?: number;
                require_last_push_approval?: boolean;
            };
            restrictions?: {
                url: string;
                users_url: string;
                teams_url: string;
                apps_url: string;
                users: {
                    login?: string;
                    id?: number;
                    node_id?: string;
                    avatar_url?: string;
                    gravatar_id?: string;
                    url?: string;
                    html_url?: string;
                    followers_url?: string;
                    following_url?: string;
                    gists_url?: string;
                    starred_url?: string;
                    subscriptions_url?: string;
                    organizations_url?: string;
                    repos_url?: string;
                    events_url?: string;
                    received_events_url?: string;
                    type?: string;
                    site_admin?: boolean;
                }[];
                teams: {
                    id?: number;
                    node_id?: string;
                    url?: string;
                    html_url?: string;
                    name?: string;
                    slug?: string;
                    description?: string;
                    privacy?: string;
                    notification_setting?: string;
                    permission?: string;
                    members_url?: string;
                    repositories_url?: string;
                    parent?: string;
                }[];
                apps: {
                    id?: number;
                    slug?: string;
                    node_id?: string;
                    owner?: {
                        login?: string;
                        id?: number;
                        node_id?: string;
                        url?: string;
                        repos_url?: string;
                        events_url?: string;
                        hooks_url?: string;
                        issues_url?: string;
                        members_url?: string;
                        public_members_url?: string;
                        avatar_url?: string;
                        description?: string;
                        gravatar_id?: string;
                        html_url?: string;
                        followers_url?: string;
                        following_url?: string;
                        gists_url?: string;
                        starred_url?: string;
                        subscriptions_url?: string;
                        organizations_url?: string;
                        received_events_url?: string;
                        type?: string;
                        site_admin?: boolean;
                    };
                    name?: string;
                    description?: string;
                    external_url?: string;
                    html_url?: string;
                    created_at?: string;
                    updated_at?: string;
                    permissions?: {
                        metadata?: string;
                        contents?: string;
                        issues?: string;
                        single_file?: string;
                    };
                    events?: string[];
                }[];
            };
            required_linear_history?: {
                enabled?: boolean;
            };
            allow_force_pushes?: {
                enabled?: boolean;
            };
            allow_deletions?: {
                enabled?: boolean;
            };
            block_creations?: {
                enabled?: boolean;
            };
            required_conversation_resolution?: {
                enabled?: boolean;
            };
            name?: string;
            protection_url?: string;
            required_signatures?: {
                url: string;
                enabled: boolean;
            };
            lock_branch?: {
                enabled?: boolean;
            };
            allow_fork_syncing?: {
                enabled?: boolean;
            };
        };
        protection_url?: string;
    }[]>;
}
