import 'dart:async';
import 'package:locally/models/feature_flags_items.dart';
import 'package:locally/services/feature_flag_service.dart';

class FeatureFlagsProvider {
  final FeatureFlagService _featureFlags;
  final StreamController<FeatureFlagItem> _controller =
      StreamController<FeatureFlagItem>();

  FeatureFlagsProvider(this._featureFlags);

  Stream<FeatureFlagItem> get featureFlagStream => _controller.stream;

  void updateFeatureFlag(FeatureFlagItem value) {
    _featureFlags.add(value);
    _controller.add(value);
  }

  void dispose() {
    _controller.close();
  }
}
