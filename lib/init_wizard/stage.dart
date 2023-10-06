import 'package:flutter/material.dart';
import 'package:locally/init_wizard/stages/domains_stage.dart';
import 'package:locally/init_wizard/stages/location_stage.dart';
import 'package:locally/init_wizard/stages/name_stage.dart';
import 'package:locally/init_wizard/stages/review_stage.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/services/environment_service.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/widgets/stages.dart';
import 'package:locally/widgets/top_bar.dart';

import '../models/environment.dart';
import '../widgets/modal_window.dart';

const stages = [
  "Name",
  "Location",
  "Domains",
  "Review",
];

class WelcomeWizardStagePage extends StatefulWidget {
  const WelcomeWizardStagePage({super.key});

  @override
  State<WelcomeWizardStagePage> createState() => _WelcomeWizardStagePageState();
}

class _WelcomeWizardStagePageState extends State<WelcomeWizardStagePage> {
  final _loading = false;
  final double modalWidth = 1030;
  final double modalHeight = 655;
  final _controller = PageController(initialPage: 0);
  final nameController = TextEditingController();
  final environmentLocationController = TextEditingController();
  final environmentLocationPathController = TextEditingController();
  final environmentLocationUserController = TextEditingController();
  final environmentLocationPasswordController = TextEditingController();
  final environmentLocationValidationController = TextEditingController();
  final domainsDomainController = TextEditingController();
  final domainsSubdomainController = TextEditingController();

  final _formKeys = [
    GlobalKey<FormState>(),
    GlobalKey<FormState>(),
    GlobalKey<FormState>(),
    GlobalKey<FormState>(),
  ];
  double currentIndex = -1;

  @override
  void initState() {
    super.initState();
    stagesChangeNotifier.stage = stages[0];
    stagesChangeNotifier.data = EnvironmentRequest();
    stagesChangeNotifier.addListener(() {
      if (mounted) {
        setState(() {
          currentIndex =
              getStageIndex(stagesChangeNotifier.currentStage).toDouble();
          print(
              "got change request ${stagesChangeNotifier.currentStage} with ${stagesChangeNotifier.previousStage}");
          if (getStageIndex(stagesChangeNotifier.currentStage) !=
              _controller.page!.toInt()) {
            print(
                "jumping to page ${getStageIndex(stagesChangeNotifier.currentStage)}");
            _controller
                .jumpToPage(getStageIndex(stagesChangeNotifier.currentStage));
          }
        });
      }
    });
  }

  int getStageIndex(String stage) {
    return stages.indexOf(stage);
  }

  Future<void> onNextPage() async {
    if (!_formKeys[_controller.page!.toInt()].currentState!.validate()) {
      return;
    }
    final state = _formKeys[_controller.page!.toInt()].currentState!;
    state.save();
    print("next page is ${_controller.page!.toInt() + 1}");
    await _controller.nextPage(
        duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
    setState(() {
      print(
          "Setting the notifier to change to ${stages[_controller.page!.toInt()]}");
      stagesChangeNotifier.stage = stages[_controller.page!.toInt()];
    });
  }

  Future<void> onPreviousPage() async {
    await _controller.previousPage(
        duration: const Duration(milliseconds: 500), curve: Curves.ease);
    setState(() {
      stagesChangeNotifier.stage = stages[_controller.page!.toInt()];
    });
  }

  bool isNextEnabled() {
    // // Position Validation
    // if (stagesChangeNotifier.currentStage == stages[stages.length - 1]) {
    //   return false;
    // }

    // Stage 0 validation
    if (stagesChangeNotifier.currentStage == stages[0]) {
      if (nameController.text.isEmpty) {
        return false;
      }
    }
    // Stage 1 validation
    if (stagesChangeNotifier.currentStage == stages[1]) {
      switch (environmentLocationController.text) {
        case "locally":
          if (environmentLocationPathController.text.isEmpty) {
            return false;
          }
          break;
        case "s3":
          if (environmentLocationUserController.text.isEmpty ||
              environmentLocationPasswordController.text.isEmpty ||
              environmentLocationValidationController.text.isEmpty) {
            return false;
          }
          break;
        case "azure":
          if (environmentLocationUserController.text.isEmpty ||
              environmentLocationPasswordController.text.isEmpty ||
              environmentLocationValidationController.text.isEmpty) {
            return false;
          }
          break;
        default:
          return false;
      }
    }
    // Stage 2 validation
    if (stagesChangeNotifier.currentStage == stages[2]) {
      if (domainsDomainController.text.isEmpty) {
        return false;
      }
      if (domainsSubdomainController.text.isEmpty) {
        return false;
      }
      return true;
    }
    // Stage 3 validation
    if (stagesChangeNotifier.currentStage == stages[3]) {
      return true;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return Scaffold(
          body: Stack(children: [
        Container(
            height: MediaQuery.of(context).size.height / 2,
            color: LocallyLightColors.darkerBackground),
        Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const TopBar(
                showLogo: false,
                color: LocallyLightColors.darkerBackground,
              ),
              Expanded(
                  child: Center(
                      child: SizedBox(
                          width: modalWidth,
                          height: modalHeight,
                          child: ModalWindow(
                              isLoading: _loading,
                              title: "Create new environment",
                              subtitle:
                                  "Flow the steps to create new environment",
                              child: Row(children: [
                                Stages(
                                  width: 280,
                                  currentStage:
                                      stagesChangeNotifier.currentStage,
                                  stagesChangeNotifier: stagesChangeNotifier,
                                  stages: stages,
                                ),
                                Expanded(
                                    child: Column(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                      Expanded(
                                          child: PageView(
                                        controller: _controller,
                                        children: [
                                          WelcomeWizardStageNamePage(
                                            stageName: "Name",
                                            nameController: nameController,
                                            formKey: _formKeys[0],
                                            onSave: (name) {
                                              print("save name: $name");
                                              stagesChangeNotifier.data?.name =
                                                  name;
                                            },
                                          ),
                                          WelcomeWizardStageLocationPage(
                                            formKey: _formKeys[1],
                                            stageName: "Location",
                                            environmentLocationController:
                                                environmentLocationController,
                                            environmentLocationPathController:
                                                environmentLocationPathController,
                                            environmentLocationUserController:
                                                environmentLocationUserController,
                                            environmentLocationPasswordController:
                                                environmentLocationPasswordController,
                                            environmentLocationValidationController:
                                                environmentLocationValidationController,
                                            onSave: (f) {
                                              stagesChangeNotifier
                                                      .data?.locationType =
                                                  environmentLocationController
                                                      .text;
                                              stagesChangeNotifier
                                                      .data?.location =
                                                  environmentLocationPathController
                                                      .text;
                                              stagesChangeNotifier
                                                      .data?.remoteUser =
                                                  environmentLocationUserController
                                                      .text;
                                              stagesChangeNotifier
                                                      .data?.remoteSecret =
                                                  environmentLocationPasswordController
                                                      .text;
                                            },
                                          ),
                                          WelcomeWizardStageDomainsPage(
                                            formKey: _formKeys[2],
                                            stageName: "Domains",
                                            domainController:
                                                domainsDomainController,
                                            subdomainController:
                                                domainsSubdomainController,
                                            onSave: (p0) {
                                              stagesChangeNotifier
                                                      .data?.domain =
                                                  domainsDomainController.text;
                                              stagesChangeNotifier
                                                      .data?.subDomain =
                                                  domainsSubdomainController
                                                      .text;
                                            },
                                          ),
                                          WelcomeWizardStageReviewPage(
                                              formKey: _formKeys[3],
                                              stageName: "Review")
                                        ],
                                      )),
                                      Padding(
                                          padding: const EdgeInsets.only(
                                              top: 20,
                                              left: 10,
                                              right: 10,
                                              bottom: 40),
                                          child: Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              if (currentIndex <
                                                  stages.length - 1)
                                                Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            right: 10),
                                                    child: ElevatedButton(
                                                        style: const ButtonStyle(
                                                            fixedSize:
                                                                MaterialStatePropertyAll(
                                                                    Size(105,
                                                                        38))),
                                                        onPressed:
                                                            isNextEnabled()
                                                                ? () async {
                                                                    await onNextPage();
                                                                  }
                                                                : null,
                                                        child: const Text(
                                                            "Next"))),
                                              if (currentIndex ==
                                                  stages.length - 1)
                                                Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            right: 10),
                                                    child: ElevatedButton(
                                                        style: const ButtonStyle(
                                                            fixedSize:
                                                                MaterialStatePropertyAll(
                                                                    Size(105,
                                                                        38))),
                                                        onPressed:
                                                            isNextEnabled()
                                                                ? () async {}
                                                                : null,
                                                        child: const Text(
                                                            "Create"))),
                                              Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          right: 10),
                                                  child: OutlinedButton(
                                                      style: const ButtonStyle(
                                                          fixedSize:
                                                              MaterialStatePropertyAll(
                                                                  Size(105,
                                                                      38))),
                                                      onPressed:
                                                          stagesChangeNotifier
                                                                      .currentStage !=
                                                                  stages[0]
                                                              ? () async {
                                                                  await onPreviousPage();
                                                                }
                                                              : null,
                                                      child:
                                                          const Text("Back"))),
                                              Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          right: 10),
                                                  child: TextButton(
                                                      style: const ButtonStyle(
                                                          fixedSize:
                                                              MaterialStatePropertyAll(
                                                                  Size(105,
                                                                      38))),
                                                      onPressed: () {
                                                        Navigator
                                                            .pushNamedAndRemoveUntil(
                                                                context,
                                                                "/wizard/welcome",
                                                                (route) =>
                                                                    false);
                                                      },
                                                      child: const Text(
                                                          "Cancel"))),
                                            ],
                                          ))
                                    ]))
                              ])))))
            ])
      ]));
    }, future: () async {
      return true;
    }());
  }
}
