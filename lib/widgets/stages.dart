import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';
import 'package:locally/styles/text.dart';

class StagesChangeNotifier<T> extends ChangeNotifier {
  String _currentStage = "";
  String _previousStage = "";
  double _position = 0;
  bool _reload = false;
  T? _data;

  String get currentStage {
    return _currentStage;
  }

  String get previousStage {
    return _previousStage;
  }

  set stage(String value) {
    _previousStage = _currentStage;
    _currentStage = value;
    notifyListeners();
  }

  set needsReload(bool value) {
    _reload = value;
    if (value) {
      notifyListeners();
    }
    _reload = false;
  }

  double get position => _position;

  set position(double value) {
    _position = value;
    notifyListeners();
  }

  bool get reload => _reload;

  T? get data => _data;

  set data(T? value) {
    _data = value;
    notifyListeners();
  }
}

class Stages extends StatefulWidget {
  final List<String>? stages;
  final String? currentStage;
  final double? width;
  final StagesChangeNotifier? stagesChangeNotifier;

  const Stages(
      {super.key,
      this.stages,
      this.currentStage,
      this.width,
      this.stagesChangeNotifier});

  StagesChangeNotifier get changeNotifier => stagesChangeNotifier!;
  @override
  State<Stages> createState() => _StagesState();
}

class _StagesState extends State<Stages> {
  GlobalKey itemColumn = GlobalKey();
  String? currentStage = "";
  List<String> visitedStages = [];

  @override
  void initState() {
    super.initState();
    currentStage = widget.currentStage ?? "";
    if (currentStage!.isNotEmpty) {
      addToVisitedStages(currentStage!);
    }
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (widget.stagesChangeNotifier != null) {
        widget.stagesChangeNotifier!.addListener(() {
          currentStage = widget.stagesChangeNotifier!.currentStage;
          final previousStage = widget.stagesChangeNotifier!.previousStage;
          addToVisitedStages(previousStage);
        });
      }
    });
  }

  void addToVisitedStages(String stage) {
    if (!visitedStages.contains(stage)) {
      visitedStages.add(stage);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(builder: (context, snapshot) {
      return SizedBox(
          width: widget.width ?? 180,
          child: Padding(
            padding: const EdgeInsets.only(top: 40, left: 40),
            child: Column(
                key: itemColumn,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var index = 0;
                      index < (widget.stages?.length ?? 0);
                      index++)
                    GestureDetector(
                        onTap: () {
                          if (widget.stagesChangeNotifier != null &&
                              visitedStages.contains(widget.stages![index])) {
                            widget.stagesChangeNotifier!.stage =
                                widget.stages![index];
                          }
                        },
                        child: Stack(children: [
                          if (index == 0)
                            Positioned(
                                left: 8,
                                top: 5,
                                child: Container(
                                  width: 2,
                                  height: 30,
                                  color: LocallyLightColors.darkerBorder,
                                )),
                          if (index != 0)
                            Positioned(
                                left: 8,
                                top: -20,
                                child: Container(
                                  width: 2,
                                  height: 60,
                                  color: LocallyLightColors.darkerBorder,
                                )),
                          Padding(
                              padding:
                                  EdgeInsets.only(top: index != 0 ? 30 : 0),
                              child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Container(
                                      width: 18,
                                      height: 18,
                                      decoration: BoxDecoration(
                                          color: (index <=
                                                      widget.stages!.indexOf(
                                                          currentStage!) ||
                                                  visitedStages.contains(
                                                      widget.stages![index]))
                                              ? LocallyLightColors.primary
                                              : LocallyLightColors.darkerBorder,
                                          borderRadius:
                                              BorderRadius.circular(50)),
                                    ),
                                    const SizedBox(
                                      width: 10,
                                    ),
                                    Text(
                                      widget.stages![index],
                                      style: smallTextStyle(
                                          fontWeight: widget.stages![index] ==
                                                  currentStage
                                              ? FontWeight.bold
                                              : FontWeight.w400),
                                    )
                                  ])),
                        ]))
                ]),
          ));
    }, future: () async {
      return true;
    }());
  }
}
