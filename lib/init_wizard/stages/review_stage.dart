import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/key_pair_text_field.dart';

import '../welcome.dart';

class WelcomeWizardStageReviewPage extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final Function(String?)? onSave;
  final String stageName;

  const WelcomeWizardStageReviewPage(
      {super.key, required this.formKey, required this.stageName, this.onSave});

  @override
  State<WelcomeWizardStageReviewPage> createState() =>
      _WelcomeWizardStageReviewPageState();
}

class _WelcomeWizardStageReviewPageState
    extends State<WelcomeWizardStageReviewPage> {
  final keyWidth = 210.0;
  @override
  void initState() {
    super.initState();
  }

  String getTypeName() {
    switch (stagesChangeNotifier.data?.locationType) {
      case "locally":
        return "Locally";
      case "azure":
        return "Azure Storage";
      case "s3":
        return "Amazon S3";
      default:
        return "";
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Form(
        key: widget.formKey,
        child: Padding(
            padding: const EdgeInsets.only(left: 10, right: 48),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 30),
                  child: Text(
                    widget.stageName,
                    style: h2TextStyle(),
                  ),
                ),
                Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: Text(
                      "Names",
                      style: normalTextStyle(),
                    )),
                LocallyKeyPairTextField(
                  padding: const EdgeInsets.only(top: 6),
                  keyFieldWidth: keyWidth,
                  keyName: "Environment name",
                  value: stagesChangeNotifier.data?.name ?? "",
                ),
                Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: Text(
                      "Location",
                      style: normalTextStyle(),
                    )),
                LocallyKeyPairTextField(
                  padding: const EdgeInsets.only(top: 6),
                  keyName: "Type",
                  keyFieldWidth: keyWidth,
                  value: getTypeName(),
                ),
                if (stagesChangeNotifier.data?.locationType == "locally")
                  LocallyKeyPairTextField(
                    padding: const EdgeInsets.only(top: 6),
                    keyName: "Configuration folder path",
                    keyFieldWidth: keyWidth,
                    value: stagesChangeNotifier.data?.location ?? "",
                  ),
                if (stagesChangeNotifier.data?.locationType == "azure" ||
                    stagesChangeNotifier.data?.locationType == "s3")
                  LocallyKeyPairTextField(
                    padding: const EdgeInsets.only(top: 6),
                    keyName: stagesChangeNotifier.data?.locationType == "azure"
                        ? "Service Principal Id"
                        : "Aws Access Key Id",
                    keyFieldWidth: keyWidth,
                    value: stagesChangeNotifier.data?.remoteUser ?? "",
                  ),
                if (stagesChangeNotifier.data?.locationType == "azure" ||
                    stagesChangeNotifier.data?.locationType == "s3")
                  LocallyKeyPairTextField(
                    padding: const EdgeInsets.only(top: 6),
                    keyName: stagesChangeNotifier.data?.locationType == "azure"
                        ? "Service Principal Secret"
                        : "Aws Access key Secret",
                    keyFieldWidth: keyWidth,
                    isPassword: true,
                    value: stagesChangeNotifier.data?.remoteSecret ?? "",
                  ),
                Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: Text(
                      "Domains",
                      style: normalTextStyle(),
                    )),
                LocallyKeyPairTextField(
                  padding: const EdgeInsets.only(top: 6),
                  keyName: "Local domain",
                  keyFieldWidth: keyWidth,
                  value: stagesChangeNotifier.data?.domain ?? "",
                ),
                LocallyKeyPairTextField(
                  padding: const EdgeInsets.only(top: 6),
                  keyName: "Local subdomain",
                  keyFieldWidth: keyWidth,
                  value: stagesChangeNotifier.data?.subDomain ?? "",
                ),
              ],
            )),
      );
    }, future: () async {
      return true;
    }());
  }
}
