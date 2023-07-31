class FeatureFlagItem {
  String? featureName;
  bool? isEnabled;

  FeatureFlagItem({
    this.featureName,
    this.isEnabled,
  });

  Map<String, dynamic> toJson() => {
        'featureName': featureName,
        'isEnabled': isEnabled,
      };
}
