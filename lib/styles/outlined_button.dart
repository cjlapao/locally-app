import 'package:flutter/material.dart';

import 'colors.dart';

OutlinedButtonThemeData outlinedButtonTheme() {
  return OutlinedButtonThemeData(
      style: ButtonStyle(
          overlayColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyColors.primaryLighter; // Disabled color
            }
            return LocallyColors.primaryLighter;
          }),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          side: MaterialStateProperty.resolveWith<BorderSide>((states) {
            if (states.contains(MaterialState.disabled)) {
              return const BorderSide(
                  color: LocallyColors.primaryLight); // Disabled color
            }
            return const BorderSide(color: LocallyColors.primary);
          }),
          foregroundColor: MaterialStateProperty.resolveWith((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyColors.primaryLight; // Disabled color
            }
            return LocallyColors.primary;
          }),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
