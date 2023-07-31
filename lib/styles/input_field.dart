import 'package:flutter/material.dart';
import 'package:locally/styles/colors.dart';

InputDecorationTheme inputTheme() {
  return InputDecorationTheme(
    filled: true,
    fillColor: LocallyColors.white,
    contentPadding: const EdgeInsets.symmetric(
      vertical: 12.0,
      horizontal: 10.0,
    ),
    enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(7.0),
        borderSide: const BorderSide(
            color: LocallyColors.inputBorder,
            style: BorderStyle.solid,
            width: 1.0)),
    focusedBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(7.0)),
        borderSide: BorderSide(color: LocallyColors.inputBorder, width: 1)),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(7.0),
      borderSide: const BorderSide(
          color: LocallyColors.inputBorder,
          style: BorderStyle.solid,
          width: 5.0),
    ),
    floatingLabelStyle: TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.normal,
      color: LocallyColors.darkGrey,
    ),
    hintStyle: const TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.normal,
    ),
  );
}
