import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:bootstrap_icons/bootstrap_icons.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';
import 'package:locally/widgets/loader.dart';
import 'package:locally/widgets/locally_text_form_field.dart';

import '../../widgets/outline_radio_button.dart';
import '../../widgets/outline_radio_button_item.dart';

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
  bool isDialogOpen = false;
  bool isValidatingAccountDetails = false;

  @override
  void initState() {
    if (widget.environmentLocationController!.text.isNotEmpty) {
      _activeButton = widget.environmentLocationController!.text;
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Stack(children: [
        Form(
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
                    controller: widget.environmentLocationController,
                    buttonWidth: 200,
                    buttonHeight: 64,
                    initialValue: "locally",
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
                        print(item.name);
                        print(widget.environmentLocationController!.text);
                        _activeButton = item.value!;
                        stagesChangeNotifier.needsReload = true;
                      });
                      widget.onSave!(item.value);
                    },
                    onSaved: widget.onSave,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please select environment location';
                      } else {
                        return null;
                      }
                    },
                  ),
                  if (_activeButton == 'locally')
                    Padding(
                        padding: const EdgeInsets.only(top: 25),
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
                            suffixChild: OutlinedButton(
                                style: const ButtonStyle(
                                    fixedSize: MaterialStatePropertyAll<Size>(
                                        Size(105, 38))),
                                onPressed: () async {
                                  String? selectedDirectory = await FilePicker
                                      .platform
                                      .getDirectoryPath();

                                  if (selectedDirectory == null) {
                                    widget.environmentLocationPathController!
                                        .text = "";
                                  } else {
                                    widget.environmentLocationPathController!
                                        .text = selectedDirectory;
                                  }
                                  stagesChangeNotifier.needsReload = true;
                                },
                                child: Text('Choose',
                                    style: normalTextStyle(
                                        color: LocallyLightColors
                                            .secondaryButtonText))),
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

                  if (_activeButton == 'azure' || _activeButton == 's3')
                    Padding(
                        padding: const EdgeInsets.only(top: 25),
                        child: Row(children: [
                          Expanded(
                              child: LocallyTextFormField(
                                  controller:
                                      widget.environmentLocationUserController,
                                  name: _activeButton == 'azure'
                                      ? "Service Principal"
                                      : "AWS Access Key ID",
                                  autovalidateMode:
                                      AutovalidateMode.onUserInteraction,
                                  onSaved: widget.onSave,
                                  width: 388,
                                  onChanged: (v) {
                                    stagesChangeNotifier.needsReload = true;
                                    widget
                                        .environmentLocationValidationController!
                                        .text = "";
                                  },
                                  validator: (value) {
                                    if (_activeButton == 'locally') {
                                      return null;
                                    }
                                    if (value == null || value.isEmpty) {
                                      return _activeButton == 'azure'
                                          ? "Please enter a valid Service Principal"
                                          : "Please enter a valid AWS Access Key ID";
                                    }
                                    return null;
                                  })),
                        ])),
                  if (_activeButton == 'azure' || _activeButton == 's3')
                    Padding(
                        padding: const EdgeInsets.only(top: 21),
                        child: Row(children: [
                          Expanded(
                              child: LocallyTextFormField(
                                  controller: widget
                                      .environmentLocationPasswordController,
                                  name: _activeButton == 'azure'
                                      ? "Service Principal Password"
                                      : "AWS Access Key Secret",
                                  autovalidateMode:
                                      AutovalidateMode.onUserInteraction,
                                  onSaved: widget.onSave,
                                  obscureText: true,
                                  width: 388,
                                  onChanged: (v) {
                                    stagesChangeNotifier.needsReload = true;
                                    widget
                                        .environmentLocationValidationController!
                                        .text = "";
                                  },
                                  validator: (value) {
                                    if (_activeButton == 'locally') {
                                      return null;
                                    }
                                    if (value == null || value.isEmpty) {
                                      return _activeButton == 'azure'
                                          ? "Please enter a valid Service Principal Password"
                                          : "Please enter a valid AWS Access Key Secret";
                                    }
                                    return null;
                                  })),
                        ])),
                  if (_activeButton == 'azure' || _activeButton == 's3')
                    Padding(
                        padding: const EdgeInsets.only(top: 28),
                        child: Row(children: [
                          SizedBox(
                              width: 214,
                              child: OutlinedButton(
                                  style: const ButtonStyle(
                                      fixedSize: MaterialStatePropertyAll<Size>(
                                          Size(188, 38))),
                                  onPressed: (widget
                                              .environmentLocationUserController!
                                              .text
                                              .isNotEmpty &&
                                          widget
                                              .environmentLocationPasswordController!
                                              .text
                                              .isNotEmpty &&
                                          !isValidatingAccountDetails)
                                      ? () {
                                          setState(() {
                                            isValidatingAccountDetails = true;
                                          });
                                          isDialogOpen = true;
                                          showDialog(
                                            context: context,
                                            barrierDismissible: false,
                                            builder: (BuildContext context) {
                                              return Dialog(
                                                shape: RoundedRectangleBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            7)),
                                                backgroundColor:
                                                    LocallyLightColors
                                                        .defaultBackground,
                                                child: Container(
                                                  padding:
                                                      const EdgeInsets.all(16),
                                                  child: Column(
                                                    mainAxisSize:
                                                        MainAxisSize.min,
                                                    children: [
                                                      const Text(
                                                        "Validating account details...",
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          fontSize: 18,
                                                        ),
                                                      ),
                                                      const SizedBox(
                                                          height: 16),
                                                      SizedBox(
                                                        height: 60,
                                                        width: 60,
                                                        child: LoadingScreen(
                                                          blurBackground: false,
                                                          height: 60,
                                                        ),
                                                      ),
                                                      SizedBox(height: 16),
                                                      ElevatedButton(
                                                        onPressed: () {
                                                          Navigator.of(context)
                                                              .pop();
                                                          isDialogOpen = false;
                                                        },
                                                        child: Text("Cancel"),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              );
                                            },
                                          );
                                          print("heya");
                                          Future.delayed(Duration(seconds: 5),
                                              () {
                                            setState(() {
                                              isValidatingAccountDetails =
                                                  false;
                                              widget
                                                  .environmentLocationValidationController!
                                                  .text = "VALID";
                                            });
                                            stagesChangeNotifier.needsReload =
                                                true;
                                            // Your code here
                                          });
                                        }
                                      : null,
                                  child: Row(
                                      mainAxisAlignment:
                                          isValidatingAccountDetails
                                              ? MainAxisAlignment.center
                                              : MainAxisAlignment.start,
                                      children: [
                                        if (isValidatingAccountDetails)
                                          const Padding(
                                              padding:
                                                  EdgeInsets.only(right: 10),
                                              child: SizedBox(
                                                  height: 20,
                                                  width: 20,
                                                  child:
                                                      CircularProgressIndicator(
                                                    strokeWidth: 1,
                                                    color: LocallyLightColors
                                                        .primary,
                                                  ))),
                                        if (!isValidatingAccountDetails)
                                          Text('Validate account details',
                                              style: normalTextStyle(
                                                  color: LocallyLightColors
                                                      .secondaryButtonText))
                                      ]))),
                        ])),
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
        ),
      ]);
    }, future: () async {
      return true;
    }());
  }
}
