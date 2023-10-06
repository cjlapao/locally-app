import 'package:flutter/material.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/widgets/locally_text_form_field.dart';
import 'package:locally/styles/text.dart';

class WelcomeWizardStageDomainsPage extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final Function(String?)? onSave;
  final String stageName;
  final TextEditingController? domainController;
  final TextEditingController? subdomainController;

  const WelcomeWizardStageDomainsPage(
      {super.key,
      required this.formKey,
      required this.stageName,
      this.domainController,
      this.subdomainController,
      this.onSave});

  @override
  State<WelcomeWizardStageDomainsPage> createState() =>
      _WelcomeWizardStageDomainsPageState();
}

class _WelcomeWizardStageDomainsPageState
    extends State<WelcomeWizardStageDomainsPage> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Form(
        key: widget.formKey,
        child: Padding(
            padding: const EdgeInsets.only(left: 10),
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
                    child: LocallyTextFormField(
                        controller: widget.domainController,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        width: 400,
                        name: "Local domain",
                        helperText: "Will be used as root domain name",
                        onSaved: widget.onSave,
                        onChanged: (v) {
                          stagesChangeNotifier.needsReload = true;
                        },
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a valid domain name';
                          }
                          return null;
                        })),
                Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: LocallyTextFormField(
                        controller: widget.subdomainController,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        width: 400,
                        name: "Local subdomain",
                        helperText:
                            "Will be used as default subdomain name to construct something",
                        onSaved: widget.onSave,
                        onChanged: (v) {
                          stagesChangeNotifier.needsReload = true;
                        },
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter a valid subdomain name';
                          }
                          return null;
                        }))
              ],
            )),
      );
    }, future: () async {
      return true;
    }());
  }
}
