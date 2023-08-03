import 'package:flutter/material.dart';
import 'package:locally/init_wizard/stages/location_stage.dart';
import 'package:locally/init_wizard/stages/name_stage.dart';
import 'package:locally/init_wizard/welcome.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/widgets/stages.dart';
import 'package:locally/widgets/top_bar.dart';

import '../widgets/modal_window.dart';

const stages = [
  "Name",
  "Location",
  "Domains",
  "Review",
];

List<String?> _data = List.filled(stages.length, '');

class WelcomeWizardStagePage extends StatefulWidget {
  const WelcomeWizardStagePage({super.key});

  @override
  State<WelcomeWizardStagePage> createState() => _WelcomeWizardStagePageState();
}

class _WelcomeWizardStagePageState extends State<WelcomeWizardStagePage> {
  final _loading = false;
  final double modalWidth = 1030;
  final double modalHeight = 650;
  final _controller = PageController(initialPage: 0);
  final nameController = TextEditingController();
  final environmentLocationController = TextEditingController();
  final environmentLocationPathController = TextEditingController();
  final environmentLocationUserController = TextEditingController();
  final environmentLocationPasswordController = TextEditingController();

  final _formKeys = [
    GlobalKey<FormState>(),
    GlobalKey<FormState>(),
    GlobalKey<FormState>()
  ];

  @override
  void initState() {
    super.initState();
    stagesChangeNotifier.stage = stages[0];
    stagesChangeNotifier.addListener(() {
      if (mounted) {
        setState(() {});
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
    setState(() {
      stagesChangeNotifier.stage = stages[_controller.page!.toInt() + 1];
    });
    await _controller.nextPage(
        duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
  }

  Future<void> onPreviousPage() async {
    setState(() {
      stagesChangeNotifier.stage = stages[_controller.page!.toInt() - 1];
    });
    await _controller.previousPage(
        duration: const Duration(milliseconds: 500), curve: Curves.ease);
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
                                  width: modalHeight * .30,
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
                                              _data[0] = name;
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
                                          ),
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
                                                      onPressed: stagesChangeNotifier
                                                                  .currentStage !=
                                                              stages[stages
                                                                      .length -
                                                                  1]
                                                          ? () async {
                                                              await onNextPage();
                                                            }
                                                          : null,
                                                      child:
                                                          const Text("Next"))),
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
