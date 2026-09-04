import React from 'react';
import { View, type ViewProps } from 'react-native';

/**
 * Browser stand-in for react-native-safe-area-context. The preview frame has
 * no notch to avoid, so the provider passes through and the view is a plain
 * View with the `edges` prop stripped.
 */

export function SafeAreaProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return <>{children}</>;
}

type SafeAreaViewProps = ViewProps & { edges?: readonly string[] };

export function SafeAreaView({
  edges: _edges,
  children,
  ...rest
}: SafeAreaViewProps): React.ReactElement {
  return <View {...rest}>{children}</View>;
}

export const initialWindowMetrics = null;
