import { Subscription } from 'rxjs';

export function destructSubscriptionArray(subscriptions: Subscription[]) {
  subscriptions.forEach((subscription: Subscription) =>
    subscription.unsubscribe()
  );
}
