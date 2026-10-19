export type FeatureName = 'LiveLines' | 'SafeRoute' | 'CrashLink' | 'Ghost' | 'Finder';
export type PlanFeatureName = 'Schedule' | 'Tasks' | 'StudyHub' | 'Groups' | 'Resources';

/** The five Find features, in the fixed order used by FeatureMenu. */
export const FEATURE_ORDER: FeatureName[] = ['LiveLines', 'SafeRoute', 'CrashLink', 'Ghost', 'Finder'];

/** Approved header wording per Find feature screen. */
export const FEATURE_HEADERS: Record<FeatureName, string> = {
  LiveLines: 'check the line.',
  SafeRoute: 'get there safe.',
  CrashLink: 'find a place to crash.',
  Ghost: 'see what’s happening.',
  Finder: 'find what’s missing.',
};

export type RootStackParamList = {
  Loader: undefined;
  Welcome: undefined;
  SignIn: undefined;
  CreateAccount: undefined;
  VerifyEmail: { email: string };
  HomeFind: undefined;
  HomePlan: undefined;
  LiveLines: undefined;
  SafeRoute: undefined;
  CrashLink: undefined;
  Ghost: undefined;
  Finder: undefined;
};
