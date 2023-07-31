import 'package:flutter/foundation.dart';

import '../common/feature_flags_ids.dart';
import '../models/feature_flags_items.dart';

class FeatureFlagService {
  List<FeatureFlagItem> featureFlags = List.empty(growable: true);

  FeatureFlagService();

  Future<void> load() async {
    featureFlags.clear();

    if (kDebugMode) {
      set(FeatureFlagItem(featureName: FeatureFlagsIds.debug, isEnabled: true));
    }
  }

  add(FeatureFlagItem flag) {
    featureFlags.add(flag);
  }

  set(FeatureFlagItem flag) {
    if (!flag.featureName!.startsWith("feature.")) {
      flag.featureName = "feature.${flag.featureName}";
    }

    var featureFlag = featureFlags.firstWhere(
        (element) => element.featureName == flag.featureName, orElse: () {
      final newFeatureFlag = FeatureFlagItem(
          featureName: flag.featureName, isEnabled: flag.isEnabled);
      add(flag);
      return newFeatureFlag;
    });
    featureFlag.isEnabled = flag.isEnabled;
  }

  getBool(String featureName, bool defaultValue) {
    if (!featureName.startsWith("feature.")) {
      featureName = "feature.$featureName";
    }
    var featureFlag = featureFlags.firstWhere(
        (element) => element.featureName == featureName,
        orElse: () =>
            FeatureFlagItem(featureName: featureName, isEnabled: defaultValue));
    return featureFlag.isEnabled;
  }

  Map<String, dynamic> toJson() => {
        'featureFlags': featureFlags,
      };
}
