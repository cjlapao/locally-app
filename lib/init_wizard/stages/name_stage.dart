import 'package:flutter/material.dart';
import 'package:locally/widgets/locally_text_form_field.dart';
import 'package:locally/styles/text.dart';

class WelcomeWizardStageNamePage extends StatefulWidget {
  const WelcomeWizardStageNamePage({super.key});
  @override
  State<WelcomeWizardStageNamePage> createState() =>
      _WelcomeWizardStageNamePageState();
}

class _WelcomeWizardStageNamePageState
    extends State<WelcomeWizardStageNamePage> {
  final _stageName = "Name";
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Expanded(
          child: Form(
              key: _formKey,
              child: Padding(
                  padding: EdgeInsets.only(left: 10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(top: 30),
                        child: Text(
                          _stageName,
                          style: h2TextStyle(),
                        ),
                      ),
                      Padding(
                          padding: const EdgeInsets.only(top: 20),
                          child: LocallyTextFormField(
                              width: 400,
                              controller: _nameController,
                              name: "Environment name",
                              helperText:
                                  "Human readable name for the context will be displayed across the app and in CLI.",
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter environment name';
                                }
                                return null;
                              }))
                    ],
                  ))));
    }, future: () async {
      return true;
    }());
  }
}
