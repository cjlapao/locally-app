import 'package:flutter/material.dart';
import 'package:locally/styles/text.dart';

class LocallyTextFormField extends StatefulWidget {
  final String? name;
  final String? helperText;
  final double? width;
  final TextEditingController? controller;
  final String? Function(String?)? validator;
  final Function(String?)? onSaved;
  final Function(String?)? onChanged;
  final Function(PointerDownEvent)? onTapOutside;
  final AutovalidateMode? autovalidateMode;
  final Widget? suffixChild;
  final bool? obscureText;

  const LocallyTextFormField(
      {Key? key,
      this.name,
      this.helperText,
      this.controller,
      this.validator,
      this.onSaved,
      this.onChanged,
      this.onTapOutside,
      this.width,
      this.autovalidateMode,
      this.obscureText,
      this.suffixChild})
      : super(key: key);
  @override
  State<LocallyTextFormField> createState() => _LocallyTextFormFieldState();
}

class _LocallyTextFormFieldState extends State<LocallyTextFormField> {
  bool showError = false;
  String? errorText;

  @override
  Widget build(BuildContext context) {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      if (widget.name != null)
        Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(widget.name!, style: normalTextStyle())),
      SizedBox(
          width: widget.width,
          child: Row(children: [
            Expanded(
                child: TextFormField(
                    obscureText: widget.obscureText ?? false,
                    autovalidateMode: widget.autovalidateMode,
                    controller: widget.controller,
                    validator: (value) {
                      if (widget.validator != null) {
                        errorText = widget.validator!(value);
                        showError = errorText != null;
                        return errorText == null ? null : '';
                      }
                      return null;
                    },
                    onChanged: widget.onChanged,
                    onTapOutside: widget.onTapOutside,
                    onSaved: widget.onSaved,
                    maxLines: 1,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                        errorStyle: TextStyle(height: 0)))),
            if (widget.suffixChild != null)
              Padding(
                  padding: const EdgeInsets.only(left: 12, right: 10),
                  child: widget.suffixChild)
          ])),
      if (showError && errorText != null)
        Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Text(errorText!, style: inputErrorTextStyle())),
      if (widget.helperText != null)
        Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Text(widget.helperText!, style: captionTextStyle())),
    ]);
  }
}
