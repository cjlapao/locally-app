import 'package:flutter/material.dart';
import 'package:locally/widgets/locally_text_form_field.dart';
import 'package:locally/styles/text.dart';

class WelcomeWizardStageNamePage extends StatelessWidget {
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
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Form(
        key: formKey,
        child: Padding(
            padding: const EdgeInsets.only(left: 10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 30),
                  child: Text(
                    stageName,
                    style: h2TextStyle(),
                  ),
                ),
                Padding(
                    padding: const EdgeInsets.only(top: 20),
                    child: LocallyTextFormField(
                        controller: nameController,
                        width: 400,
                        name: "Environment name",
                        helperText:
                            "Human readable name for the context will be displayed across the app and in CLI.",
                        onSaved: onSave,
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
