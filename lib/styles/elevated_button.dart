import 'package:flutter/material.dart';

import 'colors.dart';

ElevatedButtonThemeData elevatedButtonTheme() {
  return ElevatedButtonThemeData(
      style: ButtonStyle(
          surfaceTintColor:
              MaterialStateProperty.all<Color>(LocallyColors.white),
          backgroundColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyColors.primaryLight; // Disabled color
            }
            return LocallyColors.primary;
          }),
          elevation: MaterialStateProperty.all<double>(0),
          foregroundColor:
              MaterialStateProperty.all<Color>(LocallyColors.white),
          overlayColor:
              MaterialStateProperty.all<Color>(LocallyColors.primaryLight),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
