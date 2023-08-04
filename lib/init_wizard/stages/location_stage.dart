import 'package:flutter/material.dart';
import 'package:bootstrap_icons/bootstrap_icons.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/locally_text_form_field.dart';

import '../../widgets/outline_radio_button.dart';

class WelcomeWizardStageLocationPage extends StatefulWidget {
  final GlobalKey<FormState> formKey;
  final Function(String?)? onSave;
  final String stageName;

  final TextEditingController? environmentLocationController;
  final TextEditingController? environmentLocationPathController;
  final TextEditingController? environmentLocationUserController;
  final TextEditingController? environmentLocationPasswordController;
  final TextEditingController? environmentLocationValidationController;

  const WelcomeWizardStageLocationPage(
      {super.key,
      required this.formKey,
      required this.stageName,
      this.environmentLocationController,
      this.environmentLocationPathController,
      this.environmentLocationUserController,
      this.environmentLocationPasswordController,
      this.environmentLocationValidationController,
      this.onSave});

  @override
  State<WelcomeWizardStageLocationPage> createState() =>
      _WelcomeWizardStageLocationPageState();
}

class _WelcomeWizardStageLocationPageState
    extends State<WelcomeWizardStageLocationPage> {
  String _activeButton = '';

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
            padding: const EdgeInsets.only(left: 10, right: 117),
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
                  buttonWidth: 200,
                  buttonHeight: 64,
                  alignment: MainAxisAlignment.spaceBetween,
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
                      _activeButton = item.value!;
                      switch (item.value) {
                        case 'locally':
                          widget.environmentLocationController!.text =
                              'locally';
                          break;
                        case 's3':
                          widget.environmentLocationController!.text = 's3';
                          break;
                        case 'azure':
                          widget.environmentLocationController!.text = 'azure';
                          break;
                      }
                      if (widget
                          .environmentLocationController!.text.isNotEmpty) {
                        stagesChangeNotifier.needsReload = true;
                      }
                    });
                  },
                ),
                if (_activeButton == 'locally')
                  Padding(
                      padding: const EdgeInsets.only(top: 25),
                      child: Row(children: [
                        Expanded(
                            child: LocallyTextFormField(
                                controller:
                                    widget.environmentLocationPathController,
                                name: "Configuration folder path",
                                autovalidateMode:
                                    AutovalidateMode.onUserInteraction,
                                helperText:
                                    "Folder to store environment configuration files",
                                onSaved: widget.onSave,
                                onChanged: (v) {
                                  stagesChangeNotifier.needsReload = true;
                                },
                                validator: (value) {
                                  if (_activeButton == 'azure' ||
                                      _activeButton == 's3') {
                                    return null;
                                  }
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter a valid path';
                                  }
                                  return null;
                                })),
                        Padding(
                            padding: const EdgeInsets.only(left: 12, right: 10),
                            child: OutlinedButton(
                                style: const ButtonStyle(
                                    fixedSize: MaterialStatePropertyAll<Size>(
                                        Size(105, 38))),
                                onPressed: () {},
                                child: Text('Choose',
                                    style: normalTextStyle(
                                        color: LocallyLightColors
                                            .secondaryButtonText))))
                      ])),
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
