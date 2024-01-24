import {
  Injectable,
  InjectionToken,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isDevMode } from '@angular/core';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { from, defer, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { Credentials } from '../interfaces/credentials';
import { connect } from 'ngxtension/connect';

export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

const isDevelopment = isDevMode();

export const AUTH = new InjectionToken('Firebase auth', {
  providedIn: 'root',
  factory: () => {
    const auth = getAuth();
    if (isDevelopment) {
      connectAuthEmulator(auth, 'http://localhost:9099', {
        disableWarnings: true,
      });
    }
    return auth;
  },
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(AUTH);

  // sources
  private user$ = authState(this.auth);

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    const nextState$ = merge(this.user$.pipe(map((user) => ({ user }))));

    connect(this.state).with(nextState$);
  }

  login(credentials: Credentials) {
    return from(
      defer(() =>
        signInWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password
        )
      )
    );
  }

  logout() {
    signOut(this.auth);
  }

  createAccount(credentials: Credentials) {
    return from(
      defer(() =>
        createUserWithEmailAndPassword(
          this.auth,
          credentials.email,
          credentials.password
        )
      )
    );
  }
}
