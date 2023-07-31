import 'package:flutter/material.dart';

import 'colors.dart';

TextButtonThemeData textButtonTheme() {
  return TextButtonThemeData(
      style: ButtonStyle(
          surfaceTintColor:
              MaterialStateProperty.all<Color>(LocallyColors.white),
          elevation: MaterialStateProperty.all<double>(0),
          foregroundColor: MaterialStateProperty.resolveWith<Color>((states) {
            if (states.contains(MaterialState.disabled)) {
              return LocallyColors.primaryLight; // Disabled color
            }
            return LocallyColors.primary;
          }),
          padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
              const EdgeInsets.symmetric(vertical: 15, horizontal: 15)),
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(7.0),
            ),
          )));
}
