import 'package:flutter/material.dart';
import 'package:bootstrap_icons/bootstrap_icons.dart';
import 'package:locally/styles/text.dart';

import '../../widgets/outline_radio_button.dart';

class WelcomeWizardStageLocationPage extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final Function(String?)? onSave;
  final String stageName;

  final TextEditingController? environmentLocationController;
  final TextEditingController? environmentLocationPathController;
  final TextEditingController? environmentLocationUserController;
  final TextEditingController? environmentLocationPasswordController;

  const WelcomeWizardStageLocationPage(
      {super.key,
      required this.formKey,
      required this.stageName,
      this.environmentLocationController,
      this.environmentLocationPathController,
      this.environmentLocationUserController,
      this.environmentLocationPasswordController,
      this.onSave});

  @override
  State<WelcomeWizardStageLocationPage> createState() =>
      _WelcomeWizardStageLocationPageState();
}

class _WelcomeWizardStageLocationPageState
    extends State<WelcomeWizardStageLocationPage> {
  String _activeButton = '';

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
                  padding: const EdgeInsets.only(top: 30, bottom: 28),
                  child: Text(
                    widget.stageName,
                    style: h2TextStyle(),
                  ),
                ),
                OutlineRadioButton(
                  title: "Environment Location",
                  children: [
                    OutlineRadioButtonItem(
                        name: "Locally",
                        value: "locally",
                        icon: BootstrapIcons.hdd,
                        onTap: () {}),
                    OutlineRadioButtonItem(
                        name: "Amazon S3",
                        value: "s3",
                        icon: BootstrapIcons.cloud,
                        onTap: () {}),
                    OutlineRadioButtonItem(
                        name: "Azure Storage",
                        value: "azure",
                        icon: BootstrapIcons.cloud,
                        onTap: () {}),
                  ],
                  onChange: (item) {
                    setState(() {
                      _activeButton = item!.value!;
                      print("active: $_activeButton");
                    });
                  },
                ),
                if (_activeButton == 'azure' || _activeButton == 's3')
                  Text('Cloud')

                // Padding(
                //     padding: const EdgeInsets.only(top: 20),
                //     child: LocallyTextFormField(
                //         controller: nameController,
                //         width: 400,
                //         name: "Environment Location",
                //         helperText:
                //             "Human readable name for the context will be displayed across the app and in CLI.",
                //         onSaved: onSave,
                //         validator: (value) {
                //           if (value == null || value.isEmpty) {
                //             return 'Please enter environment name';
                //           }
                //           return null;
                //         }))
              ],
            )),
      );
    }, future: () async {
      return true;
    }());
  }
}
