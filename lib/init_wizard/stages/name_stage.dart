import 'package:flutter/material.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/widgets/locally_text_form_field.dart';
import 'package:locally/styles/text.dart';

class WelcomeWizardStageNamePage extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final Function(String?)? onSave;
  final String stageName;
  final TextEditingController? nameController;

  const WelcomeWizardStageNamePage(
      {super.key,
      required this.formKey,
      required this.stageName,
      this.nameController,
      this.onSave});

  @override
  State<WelcomeWizardStageNamePage> createState() =>
      _WelcomeWizardStageNamePageState();
}

class _WelcomeWizardStageNamePageState
    extends State<WelcomeWizardStageNamePage> {
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
                        controller: widget.nameController,
                        autovalidateMode: AutovalidateMode.onUserInteraction,
                        width: 400,
                        name: "Environment name",
                        helperText:
                            "Human readable name for the context will be displayed across the app and in CLI.",
                        onSaved: widget.onSave,
                        onChanged: (v) {
                          stagesChangeNotifier.needsReload = true;
                        },
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Please enter environment name';
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
